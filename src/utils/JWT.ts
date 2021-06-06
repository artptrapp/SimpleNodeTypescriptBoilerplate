import jwt from "jsonwebtoken"

export const JWT_SECRET = "jwtsigningiscool";

export type TokenPayload = {
  username: string,
  exp: number,
  iat: number
}

export const generateJwt = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7 days', algorithm: 'HS256' });
}

export const decodeJwt = (payload: any): TokenPayload => {
  return jwt.decode(payload) as TokenPayload
}

export const extractTokenFromHeader = (header: string | undefined) => {
  if (!header) {
    return null
  }
  const splitted = header.split(' ')
  const returnValue = splitted[splitted.length - 1]

  return returnValue
}