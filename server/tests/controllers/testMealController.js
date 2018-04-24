import chai from 'chai';
import Controller from '../../controllers/controller';
import MealController from '../../controllers/mealController';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.should();

describe('Meal Controller', () => {
  it('should be a function', () => {
    MealController.should.be.a('function');
  });
  it('should extend base controller', () => {
    const mealController = new MealController();

    mealController.should.be.instanceOf(MealController);
    mealController.should.be.instanceOf(Controller);
  });

  const request = {
    body: {
      title: 'test meal',
      description: 'great meal',
      price: 500,
      img: 'image_link',
    },
  };

  const badRequest = {
    body: {
      title: 'test meal',
      description: 'great meal',
      img: 'image_link',
    },
  };

  const req = mockReq(request);
  const res = mockRes();

  describe('create meal method', () => {
    beforeEach(() => {
      MealController.createMeal(req, res);
    });

    it('should return 201 on success', () => {
			 res.status.should.have.been.calledWith(201);
    });

    it('add a meal record successfully', () => {
		    res.json.should.have.been.calledWith({ message: 'Meal created successfully' });
    });

    it('should return error 400 if parameters are not fully given', () => {
      const badReq = mockReq(badRequest);
      MealController.createMeal(badReq, res);
      res.status.should.have.been.calledWith(400);
    });

    it('sends an error message if parameters are not fully given', () => {
      const badReq = mockReq(badRequest);
      MealController.createMeal(badReq, res);
      res.json.should.have.been.calledWith({
        status: 'error',
        message: 'Parameters supplied incorrectly',
      });
    });
  });
});
