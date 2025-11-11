import express from 'express'
import authRouter from './auth.route'
import userRouter from './users.routes'

const appRouter = express.Router()

appRouter.use('/user', userRouter)
appRouter.use('/auth', authRouter)

export default appRouter
