import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

class RecurringInvoiceValidator {
  public schema = schema.create({
    invoiceId: schema.number(),
    cron: schema.string(),
    startDate: schema.date(),
  })

  public messages: CustomMessages = {}
}

export { RecurringInvoiceValidator }
