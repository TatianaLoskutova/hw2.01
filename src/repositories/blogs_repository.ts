import {BlogMongoDbType} from '../types';
import {BlogViewModel} from '../models/blog/blogViewModel';
import {blogsCollection} from '../db/db';


export const blogsRepository = {
    async addBlogToMongoDb(addedBlog: BlogMongoDbType): Promise<BlogViewModel> {
        const result = await blogsCollection.insertOne(addedBlog)
        return {
            id: result.insertedId.toString(),
            name: addedBlog.name,
            description: addedBlog.description,
            websiteUrl: addedBlog.websiteUrl,
            createdAt: addedBlog.createdAt,
            isMembership: addedBlog.isMembership
        }
    }


}