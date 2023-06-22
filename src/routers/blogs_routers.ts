import {Router, Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndQuery, RequestWithQuery} from '../types';
import {BlogQueryModel} from '../models/blog/blogQueryModel';
import {blogQueryRepository} from '../repositories/blogs_query_repository';
import {GetByIdParam} from '../models/getById';
import {PostQueryModel} from '../models/post/postQueryModel';
import {ObjectId} from 'mongodb';
import {postsQueryRepository} from '../repositories/posts_query_repository';
import {BlogInputModel} from '../models/blog/blogInputModel';
import {blogsService} from '../domain/blogs_service';

export const blogsRouters = Router()

blogsRouters.get('/', async (req: RequestWithQuery<BlogQueryModel>, res: Response) => {
    const allBlogs = await blogQueryRepository.getAllBlogs(
        req.query.searchNameTerm,
        req.query.sortBy,
        req.query.sortDirection,
        req.query.pageNumber,
        req.query.pageSize
    )
    if (allBlogs) {
        res.status(200).send(allBlogs)
    }
})

blogsRouters.get('/:id', async (req:RequestWithParams<GetByIdParam>, res: Response) => {
    const result = await blogQueryRepository.findBlogById(new ObjectId(req.params.id))
    if (!result) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(result)
})

blogsRouters.get('/:id/posts', async (req: RequestWithParamsAndQuery<GetByIdParam,PostQueryModel>, res: Response) => {
    const result = await blogQueryRepository.findBlogById(new ObjectId(req.params.id))
    if (!result) {
        res.sendStatus(404)
        return
    }
    const foundedPostByBlogId = await postsQueryRepository.getPostsByBlogId(
        new ObjectId(req.params.id),
        req.query.pageNumber,
        req.query.pageSize,
        req.query.sortBy,
        req.query.sortDirection
    )
    res.status(200).send(foundedPostByBlogId)
})

blogsRouters.post('/', async (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const newBlog = await blogsService.createBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    }
})

