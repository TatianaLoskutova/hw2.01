import {ObjectId} from 'mongodb'

export type BlogMongoDbType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type PostMongoDbType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}