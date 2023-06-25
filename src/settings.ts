import express from 'express'
import bodyParser from 'body-parser';
import {blogsRouters} from './routers/blogs_routers';
import {postsRouters} from './routers/posts_routers';
import {testingRouter} from './routers/testing_router';
import {authRouter} from './routers/auth_router';
import {usersRouter} from './routers/users_router';

export const app = express()
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
app.use('/blogs', blogsRouters)
app.use('/posts', postsRouters)
app.use('/testing', testingRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)