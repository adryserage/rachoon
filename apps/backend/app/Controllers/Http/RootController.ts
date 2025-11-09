import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizationHelper from 'App/Helpers/organization'

export default class RootController {
  public async index(ctx: HttpContextContract) {
    const organization = await OrganizationHelper.getFromContext(ctx)
    if (!organization) {
      return ctx.response.ok({ available: true })
    } else {
      return organization
    }
  }
}
