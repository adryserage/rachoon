import Document from 'App/Models/Document'
import NumberService from './Number'
import { DateTime } from 'luxon'

export default class DocumentService {
  public static async duplicate(
    id: number,
    organizationid: number,
    recurringId: number | null = null
  ) {
    const d = await Document.query().where({ id: id }).firstOrFail()
    const now = DateTime.now()

    const duplicate = new Document()
    duplicate.fill(d.$attributes)
    duplicate.number = await NumberService.document(organizationid, d.type)
    duplicate.data.date = now
    duplicate.data.dueDate = now.plus({ days: duplicate.data.dueDays })

    delete duplicate.$attributes.id
    duplicate.$attributes.createdAt = now
    duplicate.$attributes.updatedAt = now

    if (recurringId !== null) {
      duplicate.recurringId = recurringId
    }

    return await duplicate.save()
  }
}
