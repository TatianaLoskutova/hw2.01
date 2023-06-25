import {UserViewModel} from '../models/users/userViewModel';
import bcrypt from 'bcrypt'
import {ObjectId} from 'mongodb';
import {UserDbType} from '../types';
import {usersRepository} from '../repositories/users_repository';
import {UserInputModel} from '../models/users/userInputModel';
import {LoginInputModel} from '../models/auth/loginInputModel';

export const usersService = {
    async createUser(inputData: UserInputModel): Promise<UserViewModel> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(inputData.password, passwordSalt)

        const newUserDbType: UserDbType = {
            _id: new ObjectId(),
            login: inputData.login,
            email: inputData.email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }
        return await usersRepository.addUserToDb(newUserDbType)
    },

    async checkCredentials(inputData: LoginInputModel) {
        const user = await usersRepository.findByLoginOrEmail(inputData.loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(inputData.password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

}

