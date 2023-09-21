import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  beforeCreate,
} from "@ioc:Adonis/Lucid/Orm";
import Message from "./Message";
import { v4 as uuid } from "uuid";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column()
  public bio: string | null;

  @column()
  public isAdmin: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>;

  /**
   * The @beforeCreate() method generates and assigns a unique UUID as the primary key for a User model instance before saving it to the database. This ensures that each user is uniquely identified by an UUID 
   */
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
