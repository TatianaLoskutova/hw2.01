import {blogsCollection, postsCollection, usersCollection} from '../db/db';
import {BlogMongoDbType, PostMongoDbType, UserDbType} from '../types';
import bcrypt from 'bcrypt';


export const makeBlogPagination = async (
    filter: any,
    sortObj: any,
    pageNumber: number,
    pageSize: number
) => {
    return await blogsCollection
        .find(filter)
        .sort(sortObj)
        .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize: 0)
        .limit(+pageSize > 0 ? +pageSize : 0)
        .toArray()
}

export const makeBlogMapping = (arr: BlogMongoDbType[]) => {
    return arr.map((blog) => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    })
}

export const makePostPagination = async (
    sortObj: any,
    pageNumber: number,
    pageSize: number,
    filter?: any
) => {
    return await postsCollection
        .find(filter)
        .sort(sortObj)
        .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0)
        .limit(+pageSize > 0 ? +pageSize : 0)
        .toArray()
}

export const makePostMapping  = (arr: PostMongoDbType[]) => {
    return arr.map((post) => {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    })
}

export const makeUserPagination = async (
    filter: any,
    sortObj: any,
    pageNumber: number,
    pageSize: number
) => {
    return await usersCollection
        .find(filter.login, filter.email)
        .sort(sortObj)
        .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize: 0)
        .limit(+pageSize > 0 ? +pageSize : 0)
        .toArray()
}

export const makeUserMapping = (arr: UserDbType[]) => {
    return arr.map((user) => {
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt

        }
    })
}



