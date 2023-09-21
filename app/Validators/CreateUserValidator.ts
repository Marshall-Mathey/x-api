import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({}, [rules.minLength(3), rules.maxLength(50)]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(50)]),
    bio: schema.string.nullableAndOptional({ trim: true }),
    isAdmin: schema.boolean(),
  });
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "username.minLength": "Username must be at least 3 characters long",
    "username.maxLength": "Username must be at most 50 characters long",
    "email.email": "Email must be a valid email address",
    "email.unique": "Email must be unique",
    "password.minLength": "Password must be at least 8 characters long",
    "password.maxLength": "Password must be at most 50 characters long",
  };
}
