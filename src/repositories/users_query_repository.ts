import {blogsCollection, usersCollection} from '../db/db';
import {makeUserMapping, makeUserPagination} from '../helpers/functions';
import {PaginatorUserViewModel} from '../models/users/userViewModelWithPagination';
import {ObjectId} from 'mongodb';
import {BlogViewModel} from '../models/blog/blogViewModel';
import {UserViewModel} from '../models/users/userViewModel';


export const usersQueryRepository = {
    async getAllUsers(
        sortBy: string = 'createdAt',
        sortDirection: string = 'desc',
        pageNumber: number = 1,
        pageSize: number = 10,
        searchLoginTerm: string | null = null,
        searchEmailTerm: string | null = null
    ): Promise<PaginatorUserViewModel> {

        const filter: any = {}
        const sortObj: any = {}

        if (searchLoginTerm) {
            filter.login = {$regex: searchLoginTerm}
        }
        if (searchEmailTerm) {
            filter.email = {$regex: searchEmailTerm}
        }
        if (sortBy) {
            sortObj[sortBy] = -1
        }
        if (sortDirection === 'asc') {
            sortObj[sortBy] = 1
        }
        const usersCount = await usersCollection.countDocuments(filter)
        const pagesCount = Math.ceil(usersCount / +pageSize)
        const paging = await makeUserPagination(filter, sortObj, pageNumber, pageSize)

        return {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: usersCount,
            items: makeUserMapping(paging)
        }
},
    async findUserById(_id: ObjectId): Promise<UserViewModel | null>  {
        const foundedUser = await usersCollection.findOne({_id})

        if (!foundedUser) {
            return null
        }
        return {
            id: foundedUser._id.toString(),
            login: foundedUser.login,
            email: foundedUser.email,
            createdAt: foundedUser.createdAt
        }
    }
}
