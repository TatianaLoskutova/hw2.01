// import {LoginInputModel} from '../models/auth/loginInputModel';
// import {usersRepository} from '../repositories/users_repository';
//
//
// export async function checkCredentialsValidation(inputData: LoginInputModel): Promise<boolean> {
//     const user = await usersRepository.findByLoginOrEmail(inputData.loginOrEmail)
//     if (!user) return false
//     const passwordHash = await this._generateHash(inputData.password, user.passwordSalt)
//     if (user.passwordHash !== passwordHash) {
//         return false
//     }
//     return true
// }