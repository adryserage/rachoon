import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvoiceOrOffer from '../../Models/InvoiceOrOffer'
import { InvoiceOrOfferValidator } from '../../Validators/InvoiceOrOffer'

export default class InvoicesOrOffersController {
  public async index(ctx: HttpContextContract) {
    if (!['invoice', 'offer'].includes(ctx.request.qs()['type'])) {
      return ctx.response.badRequest('Type must be invoice or offer')
    }
    if (ctx.request.qs()['count']) {
      return await InvoiceOrOffer.query()
        .where({
          organizationId: ctx.auth.user?.organizationId,
          type: ctx.request.qs()['type'].toLowerCase(),
        })
        .withTrashed()
        .getCount()
    }
    return await InvoiceOrOffer.query()
      .where({
        organizationId: ctx.auth.user?.organizationId,
        type: ctx.request.qs()['type'].toLowerCase(),
      })
      .preload('client')
      .preload('offer')
      .preload('invoices')
      .orderBy('created_at', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    return await InvoiceOrOffer.create({
      ...(await ctx.request.validate(InvoiceOrOfferValidator)),
      type: ctx.request.qs()['type'].toLowerCase(),
      organizationId: ctx.auth.user?.organizationId,
    })
  }

  public async update(ctx: HttpContextContract) {
    const io = await InvoiceOrOffer.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .firstOrFail()
    io.merge(await ctx.request.validate(InvoiceOrOfferValidator))
    await io.save()
    return io
  }

  public async destroy(ctx: HttpContextContract) {
    return (
      await InvoiceOrOffer.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .firstOrFail()
    ).delete()
  }

  public async show(ctx: HttpContextContract) {
    return await InvoiceOrOffer.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .preload('client')
      .preload('offer')
      .preload('invoices')
      .firstOrFail()
  }
}
