import { Express, Response } from 'express-serve-static-core'
import Joi from 'joi'
import BaseBLO from '../blo/BaseBLO'

export default abstract class BaseController<T extends BaseBLO> {
  public serverInstance: Express
  public bloInstance: T

  constructor(
    app: Express,
    bloType: (new () => T)
  ) {
    this.serverInstance = app
    this.bloInstance = new bloType()
  }

  /**
   * Used to register routes that the given controller will
   * handle requests for.
   */
  abstract registerRoutes(app: Express): void;

  protected HttpResponse(response: Response, statusCode: number, body: any): Response<any> {
    return response.status(statusCode).json(body)
  }

  public BadRequest(response: Response, responseBody: any) {
    return this.HttpResponse(response, 400, responseBody)
  }

  public Ok(response: Response, body: any) {
    return this.HttpResponse(response, 200, body)
  }

  public InternalServerError(response: Response, body: any) {
    return this.HttpResponse(response, 500, body)
  }

  public translateJoiErrorMessage(error: Joi.ValidationError) {
    return error.details.map(error => ({
      message: error.message,
      path: error.path
    }))
  }
}
