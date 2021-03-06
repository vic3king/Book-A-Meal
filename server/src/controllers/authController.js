import { user as User } from '../models';

/**
 * @exports
 * @class AuthController
 */
class AuthController {
  /**
   * Authenticates users
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static login(req, res, next) {
    const { username, password } = req.body;

    const user = User.find({
      where: {
        username
      }
    });

    const passwordIsValid = user.then((foundUser) => {
      if (foundUser) {
        return foundUser.validPassword(password);
      }
    });

    return Promise.all([user, passwordIsValid])
      .then(([foundUser, givenPasswordIsValid]) => {
        if (givenPasswordIsValid) {
          const token = foundUser.generateToken();

          req.app.emit('UserLogin', foundUser);
          return res.status(200).json({
            status: 'success',
            user: foundUser,
            token
          });
        }
      })
      .then((responseSent) => {
        if (!responseSent) {
          res.status(401).json({
            status: 'error',
            message: 'Username or password is incorrect'
          });
        }
      })
      .catch(next);
  }

  /**
   * Creates new users
   *
   * @staticmethod
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static signup(req, res, next) {
    const {
      fullName,
      username,
      email,
      password,
      role
    } = req.body;

    return User.create({
      fullName,
      username,
      email,
      password,
      role
    })
      .then((user) => {
        const token = user.generateToken();

        req.app.emit('UserSignup', user);
        return res.status(201).json({
          status: 'success',
          user,
          token
        });
      })
      .catch(next);
  }
}

export default AuthController;
