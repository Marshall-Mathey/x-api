import CreateUserDto from "../Dtos/Auth/CreateUserDto";
import User from "../Models/User";
export default class AuthService {

  public async register(dto: CreateUserDto){
    try {
        const user = await User.create(dto)
        await user.save()
        return user
    } catch (error) {
        console.log(error)
        throw error
    }
  }
}
