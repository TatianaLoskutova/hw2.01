import {Router, Request, Response} from 'express';
import {UserInputModel} from '../models/users/userInputModel';
import {RequestWithBody} from '../types';
import {usersService} from '../domain/users_service';
import {emailValidation, loginValidation, passwordValidation} from '../middlewares/users_validation';
import {errorsValidation} from '../middlewares/errors_validation';

export const usersRouter = Router()

usersRouter.post('/',
    loginValidation,
    passwordValidation,
    emailValidation,
    errorsValidation,
    async (req: RequestWithBody<UserInputModel>, res: Response) => {
    const newUser = await usersService.createUser(req.body)
    if(!newUser) {
        res.sendStatus(401)
    } else {
        res.status(201).send(newUser)
    }
})

