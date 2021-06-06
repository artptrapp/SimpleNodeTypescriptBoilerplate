import BaseController from "./base-controller"
import { Express, Request, Response } from 'express-serve-static-core'
import { AuthVerifySchema, RegisterSchema, RegisterSchemaData } from "../schemas/auth-schemas"
import AuthBLO from "../blo/AuthBLO"

export default class AuthController extends BaseController<AuthBLO> {

  constructor(app: Express) {
    super(app, AuthBLO)
    this.registerRoutes()
  }

  registerRoutes(): void {
    this.serverInstance.post('/auth/verify', this.authenticate.bind(this))
    this.serverInstance.post('/auth/create', this.createUser.bind(this))
  }

  private authenticate(req: Request, res: Response): Response<any> {
    const { error, value } = AuthVerifySchema.validate(req.body, { abortEarly: false, allowUnknown: false })
    if (error) {
      return this.BadRequest(res, this.translateJoiErrorMessage(error))
    }

    return this.Ok(res, this.bloInstance.getBanana())
  }

  private async createUser(req: Request, res: Response): Promise<Response<any>> {
    const { error, value } = RegisterSchema.validate(req.body, { abortEarly: false, allowUnknown: false })
    if (error) {
      return this.BadRequest(res, this.translateJoiErrorMessage(error))
    }

    const data = value as RegisterSchemaData

    try {

      const user = await this.bloInstance.createUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      )

      return this.Ok(res, user)
    } catch (e) {
      return this.InternalServerError(res, e)
    }
  }

}