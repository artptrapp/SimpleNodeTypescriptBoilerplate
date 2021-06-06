import expressJwt from 'express-jwt';
import { JWT_SECRET } from '../utils/JWT';

export default function jwt() {
  return expressJwt(
    {
      secret: JWT_SECRET,
      algorithms: ['HS256'],
      getToken: (req) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
          return null
        }

        const splitted = authorization.split(' ')
        if (splitted.length === 2 && splitted[0] === 'Bearer') {
          return splitted[1]
        }

        return null;
      }
    }).unless({
      path: [
        // paths that do not need jwt
        '/health-check',
        '/auth/verify',
        '/auth/create'
      ]
    })
}