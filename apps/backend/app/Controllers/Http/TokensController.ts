import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import hashids from 'App/Helpers/hashids'
import TokenValidator from 'App/Validators/Token'

export default class TokensController {
  public async index(ctx: HttpContextContract) {
    const tokens = await Database.from('api_tokens')
      .where('user_id', ctx.auth.user!.id)
      .andWhereNot('name', 'Opaque Access Token')
      .orderBy('created_at', 'desc')
      .select('id', 'name', 'token', 'expires_at', 'created_at')

    return tokens.map((t) => {
      t.id = hashids.encode(t.id)
      return t
    })
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TokenValidator)
    return ctx.auth.use('api').generate(ctx.auth.user!, { name: body.name })
  }

  public async destroy(ctx: HttpContextContract) {
    const token = await Database.from('api_tokens')
      .where('user_id', ctx.auth.user!.id)
      .andWhere('id', ctx.params.id)
      .firstOrFail()

    if (!token) {
      return ctx.response.status(404).json({ message: 'Token not found' })
    }
    await Database.from('api_tokens').where('id', token.id).delete()
    return ctx.response.status(204)
  }
}
