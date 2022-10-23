// import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// import IMiddleware from '../interfaces/Middleware';
// import userService from '../services/login.service';

// dotenv.config();

// const secret = process.env.JWT_SECRET || 'jwt_secret';

// const tokenAuthenticate: IMiddleware = {

//   async authenticate(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) {
//       res.status(402).json({ message: 'Token not found' });
//     } else {
//       try {
//         const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
//         const email = await userService.find(decoded.data.email);
//         if (!email) {
//           res.status(401).json({ message: 'Expired or invalid token' });
//         }
//         res.locals.user = email;
//         next();
//       } catch (err) {
//         res.status(401).json({ message: 'Expired or invalid token' });
//       }
//     }
//   },
// };

// export default tokenAuthenticate;
