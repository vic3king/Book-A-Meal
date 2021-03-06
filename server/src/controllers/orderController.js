import { order as orders, meal as meals } from '../models';

/**
 * @exports
 * @class OrderController
 */
class OrderController {
  /**
   * Creates a new order
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - Middleware next
   * @return {json} res.json
   */
  static createOrder(req, res, next) {
    const {
      mealId,
      quantity,
      deliveryAddress,
      phoneNumber
    } = req.body;

    return meals.findOne({
      where: {
        id: mealId
      }
    })
      .then((foundMeal) => {
        if (foundMeal) {
          const price = foundMeal.price * quantity;
          return orders.create({
            userId: req.user.id,
            mealId,
            quantity,
            deliveryAddress,
            phoneNumber,
            price,
            status: 'pending'
          });
        }
        res.status(404).json({
          status: 'error',
          message: 'Meal does not exist'
        });
      })
      .then((createdOrder) => {
        if (createdOrder) {
          return createdOrder.reload();
        }
      })
      .then((createdOrder) => {
        if (createdOrder) {
          req.app.emit('OrderCreated', createdOrder);

          res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            order: createdOrder
          });
        }
      })
      .catch(next);
  }

  /**
   * Gets all orders
   *
   * @staticmethod
   * @param  {object} req Request object
   * @param {object} res Response object
   * @param {function} next Middlware next
   * @return {json} res.json
   */
  static getAllOrders(req, res, next) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = limit * (page - 1);

    let findOrders;

    switch (req.user.role) {
      case 'caterer':
        findOrders = orders.scope({ method: ['caterer', req.user.id] })
          .findAndCountAll({ limit, offset });
        break;
      case 'customer':
        findOrders = orders.findAndCountAll({
          where: {
            userId: req.user.id
          },
          limit,
          offset
        });
        break;
      default:
        findOrders = orders.findAndCountAll({
          limit, offset
        });
        break;
    }

    return findOrders
      .then(({ count, rows }) => {
        const pageCount = Math.ceil(count / limit);
        const filteredOrders = rows.map(order => order.meal && order)
          .filter(Boolean);

        res.status(200).json({
          status: 'success',
          orders: filteredOrders,
          pagination: {
            itemCount: count,
            pageCount,
            currentPage: page
          }
        });
      })
      .catch(next);
  }

  /**
   * Updates an existing order
   *
   * @staticmethod
   *
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {Function} next - Middleware next
   * @return {json} res.json
   */
  static updateOrder(req, res, next) {
    const {
      mealId,
      quantity,
      deliveryAddress,
      phoneNumber
    } = req.body;

    const { order } = req;

    return meals.findOne({
      where: {
        id: mealId || order.mealId
      }
    })
      .then((foundMeal) => {
        if (foundMeal) {
          const newPrice = foundMeal.price * quantity;
          return order.updateAttributes({
            mealId: mealId || order.mealId,
            quantity: quantity || order.quantity,
            deliveryAddress: deliveryAddress || order.deliveryAddress,
            phoneNumber: phoneNumber || order.phoneNumber,
            price: quantity ? newPrice : order.price
          });
        }
      })
      .then((updatedOrder) => {
        if (updatedOrder) {
          req.app.emit('OrderUpdated', updatedOrder);

          res.status(200).json({
            status: 'success',
            message: 'order updated successfully',
            order: updatedOrder
          });
        }
      })
      .catch(next);
  }

  /**
   * Cancels an existing order
   *
   * @staticmethod
   *
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {Function} next Middleware next
   * @return {json} res.json
   */
  static cancelOrder(req, res, next) {
    const { order } = req;

    return order.updateAttributes({
      status: 'cancelled'
    })
      .then((updatedOrder) => {
        req.app.emit('OrderCancelled', updatedOrder);

        res.status(200).json({
          status: 'success',
          message: 'order cancelled successfully',
          order: updatedOrder
        });
      })
      .catch(next);
  }

  /**
   * Mark an order as delivered order
   *
   * @staticmethod
   *
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {Function} next - Middleware next
   * @return {json} res.json
   */
  static deliverOrder(req, res, next) {
    const { orderId } = req.params;

    return orders.scope({ method: ['caterer', req.user.id] })
      .findAll()
      .then(mealOrders => mealOrders.find(order => order.id === orderId))
      .then((order) => {
        if (order) {
          return order.update({
            status: 'delivered'
          });
        }
      })
      .then((deliveredOrder) => {
        if (deliveredOrder) {
          req.app.emit('OrderDelivered', deliveredOrder);

          return res.status(200).json({
            status: 'success',
            message: 'Order delivered successfully',
            order: deliveredOrder
          });
        }

        res.status(404).json({
          status: 'error',
          message: 'Order not found'
        });
      })
      .catch(next);
  }
}

export default OrderController;
