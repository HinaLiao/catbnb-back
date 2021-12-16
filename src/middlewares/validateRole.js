/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import RoleNotAuthorizedException from '../exceptions/RoleNotFoundException';

const validateRoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        return next();
      }

      throw new RoleNotAuthorizedException();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRoleMiddleware;
