export default class CreateUserDto {
    username: string
    email: string
    password: string
    bio?: string | null
    isAdmin?: boolean
}