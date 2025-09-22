import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  public async index(ctx: HttpContextContract) {
    return ctx.auth.use('api').generate(ctx.auth.user!)
  }
}
