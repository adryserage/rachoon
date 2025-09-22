import { DateTime } from 'luxon'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from '../Helpers/hashids'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class Template extends compose(BaseModel, SoftDeletes) {
  public serializeExtras() {
    return {
      isGlobal: this.organizationId === null,
    }
  }
  public isGlobal: boolean

  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public title: string

  @column()
  public default: boolean

  @column()
  public premium: boolean

  @column()
  public data: any

  @column()
  public html: string

  @column()
  public thumbnail: string

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
