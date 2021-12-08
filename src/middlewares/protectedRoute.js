import NotAuthorizedException from '../exceptions/NotAuthorizedException';
// import RoleNotFoundException from '../exceptions/RoleNotFoundException';
import { verifyLoginToken } from '../utils/jwt';

const protectedRouteMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.get('Authorization');

    if (!bearerToken) {
      throw new NotAuthorizedException('Missing token');
    }

    try {
      const token = bearerToken.slice(7);
      const tokenInfo = verifyLoginToken(token);

      req.user = {
        id: tokenInfo.id,
        role: tokenInfo.role,
      };

      // try {
      //   // eslint-disable-next-line consistent-return
      //   const validateRoleMiddleware = (roles) => {
      //     try {
      //       if (roles.includes(req.user.role)) {
      //         return next();
      //       }

      //       throw new RoleNotFoundException();
      //     } catch (error) {
      //       next(error);
      //     }
      //   };
      // } catch (error) {
      //   throw new RoleNotFoundException();
      // }

      next();
    } catch (error) {
      throw new NotAuthorizedException('Invalid/ Expired Token');
    }
  } catch (error) {
    next(error);
  }
};

export default protectedRouteMiddleware;
