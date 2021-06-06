import { Request, Response } from 'express-serve-static-core'

export default function GeneralRequestHandler(err: Error, req: Request, res: Response, next: any) {
  // Handles JWT verify errors
  if (err && err.name === "UnauthorizedError") {
    res.status(401).json({
      message: 'You are not authorized to access this resource',
      path: req.path
    })
    return
  }

  next()
}