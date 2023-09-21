import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import AuthService from "../../Services/AuthService";
import CreateUserValidator from "../../Validators/CreateUserValidator";
import { inject } from "@adonisjs/core/build/standalone";
@inject(AuthService)
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async register({ request, response }: HttpContextContract) {
    try {
      const dto = await request.validate(CreateUserValidator);
      console.log(dto);
      await this.authService.register(dto);
      return response.created(`Congrats ${dto.username}, You're registered !`);
    } catch (error) {
      return error;
    }
  }
}
