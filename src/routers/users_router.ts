import {Router,Response} from 'express';
import {UserInputModel} from '../models/users/userInputModel';
import {RequestWithBody, RequestWithParams, RequestWithQuery} from '../types';
import {usersService} from '../domain/users_service';
import {emailValidation, loginValidation, passwordValidation} from '../middlewares/users_validation';
import {errorsValidation} from '../middlewares/errors_validation';
import {UserQueryModel} from '../models/users/userQueryModel';
import {usersQueryRepository} from '../repositories/users_query_repository';
import {GetByIdParam} from '../models/getById';
import {authorizationValidation} from '../middlewares/authorization_validation';

export const usersRouter = Router()

usersRouter.get('/', async (req: RequestWithQuery<UserQueryModel>, res: Response) => {
    const allUsers = await usersQueryRepository.getAllUsers(
        req.query.sortBy,
        req.query.sortDirection,
        req.query.pageNumber,
        req.query.pageSize,
        req.query.searchLoginTerm,
        req.query.searchEmailTerm
    )
    if (!allUsers) {
        res.sendStatus(401)
        return
    } else {
        res.status(200).send(allUsers)
    }
})

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

usersRouter.delete('/:id',
    // loginValidation,
    // passwordValidation,
    // emailValidation,
    authorizationValidation,
    errorsValidation,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await usersService.deleteUserById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })
