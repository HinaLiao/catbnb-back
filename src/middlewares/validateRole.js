// import RoleNotAuthorizedException from '../exceptions/RoleNotFoundException';

// const validateRoleMiddleware = (roles) => (
//   (req, res, next) => {
//     try {
//       if (roles.includes(req.user.role)) {
//         return next();
//       }

//       throw new RoleNotAuthorizedException();

//     } catch (error) {
//       next(error);
//     }
//   };
// );

// export default validateRoleMiddleware;

/*
router.get('/',
        validateRoleMiddleware(['Customer', 'Host']),
        async (req, res, next) => {
            try {
            const { title } = req.query;
            const { id } = req.user;

            const reservation = await reservationService.findAllByTitleAndOwnerId(
                title,
                id
            );

            res.json(reservation);
            } catch (error) {
            next(error);
            }
        }
        );

router.get(
  '/:reservationId',
  validateRoleMiddleware(['Host', 'Admin']),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { reservationId } = req.params;

      const reservation = await reservationService.findOneByIdAndOwnerId(
        reservationId,
        id
      );

      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);
*/
