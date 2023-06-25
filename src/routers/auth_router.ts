import {Router, Response} from 'express';
import {RequestWithBody} from '../types';
import {LoginInputModel} from '../models/auth/loginInputModel';
import {errorsValidation} from '../middlewares/errors_validation';
import {loginOrEmail, password} from '../middlewares/auth_validation';
import {checkCredentialsValidation} from '../middlewares/checkCredentials_middleware';


export const authRouter = Router()

authRouter.post('/login',
    loginOrEmail,
    password,
    errorsValidation,
    async (req:RequestWithBody<LoginInputModel>, res: Response) => {
    const checkResult = await checkCredentialsValidation(req.body)
        if (!checkResult) {
            res.sendStatus(401)
            return
        } else  {
            res.sendStatus(204)
        }
})