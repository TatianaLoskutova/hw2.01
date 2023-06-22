import {Router, Request, Response} from 'express';
import {blogsService} from '../domain/blogs_service';
import {postsService} from '../domain/posts_service';


export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await blogsService.deleteAllBlogs()
    await postsService.deleteAllPosts()
    res.sendStatus(204)
})