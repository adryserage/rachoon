import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'
import TemplateValidator from 'App/Validators/Template'

export default class TemplatessController {
  private async removeDefault(ctx: HttpContextContract, id: number) {
    await Template.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .andWhereNot({ id: id })
      .update({ default: false })
  }

  public async index(ctx: HttpContextContract) {
    return await Template.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .orWhere({ organizationId: null, premium: false })
      .orderBy('organization_id', 'desc')
      .orderBy('created_at', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TemplateValidator)
    const created = await Template.create({
      ...body,
      organizationId: ctx.auth.user?.organizationId,
    })
    if (body.default) {
      await this.removeDefault(ctx, created.id)
    }
  }

  public async destroy(ctx: HttpContextContract) {
    return (
      await Template.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .andWhereNot({ default: true })
        .firstOrFail()
    ).delete()
  }

  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TemplateValidator)
    await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .update({
        ...body,
      })

    const updated = await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .firstOrFail()

    if (body.default) {
      await this.removeDefault(ctx, updated.id)
    }
    return updated
  }

  public async show(ctx: HttpContextContract) {
    return await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .orWhere({ id: ctx.request.param('id'), organizationId: null })
      .firstOrFail()
  }

  public async default(ctx: HttpContextContract) {
    return await Template.query()
      .where({
        organizationId: ctx.auth.user?.organizationId,
        default: true,
      })
      .firstOrFail()
  }

  public async duplicate(ctx: HttpContextContract) {
    const template = await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .orWhere({ id: ctx.request.param('id'), organizationId: null })
      .firstOrFail()

    const duplicate = new Template()
    duplicate.fill(template.$attributes)
    duplicate.$attributes.title = `${template.title} (Copy)`
    delete duplicate.$attributes.id
    delete duplicate.$attributes.created_at
    delete duplicate.$attributes.updated_at
    duplicate.$attributes.title = `${template.title} (Copy)`
    duplicate.$attributes.default = false
    duplicate.$attributes.premium = false

    return await duplicate.save()
  }
}
