import { Express } from 'express-serve-static-core'
import BaseBLO from './blo/BaseBLO'
import AuthController from './controllers/auth-controller'
import BaseController from './controllers/base-controller'

export default class Router {
  private serverInstance: Express
  private controllers: BaseController<BaseBLO>[]

  constructor(app: Express) {
    this.serverInstance = app
    this.controllers = []
    this.addRoutes()
  }

  private addRoutes() {
    this.controllers.push(
      new AuthController(this.serverInstance)
    )
  }
}