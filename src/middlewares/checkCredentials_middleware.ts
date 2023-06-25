import {LoginInputModel} from '../models/auth/loginInputModel';
import {usersQueryRepository} from '../repositories/users_query_repository';


export async function checkCredentialsValidation(inputData: LoginInputModel): Promise<boolean> {
    const user = await usersQueryRepository.findByLoginOrEmail(inputData.loginOrEmail)
    if (!user) return false
    const passwordHash = await this._generateHash(inputData.password, user.passwordSalt)
    if (user.passwordHash !== passwordHash) {
        return false
    }
    return true
}