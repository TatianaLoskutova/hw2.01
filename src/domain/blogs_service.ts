import {BlogInputModel} from '../models/blog/blogInputModel';
import {BlogViewModel} from '../models/blog/blogViewModel';
import {BlogMongoDbType} from '../types';
import {ObjectId} from 'mongodb';
import {blogsRepository} from '../repositories/blogs_repository';


export const blogsService = {
    async createBlog(inputData: BlogInputModel): Promise<BlogViewModel> {
        const blogToMongoDb: BlogMongoDbType = {
            _id: new ObjectId(),
            name: inputData.name,
            description: inputData.description,
            websiteUrl: inputData.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await blogsRepository.addBlogToMongoDb(blogToMongoDb)
    }

}