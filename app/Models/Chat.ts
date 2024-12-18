import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Chat extends BaseModel {

  public static table = 'chats'

  @column({ isPrimary: true })
  public id: number

  @column()
  public telefono_remitente: string;

  @column()
  public telefono_destinatario: string;

  @column()
  public contenido: string;

  @column()
  public fecha_envio: Date;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
