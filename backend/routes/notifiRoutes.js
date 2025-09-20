import express from 'express'
import { addNotification, getUserNotificationsByUserId } from '../controllers/notifiController.js'
import { admin, authMiddleware } from '../middlewares/authMiddleware.js'

const notifiRouter = express.Router()

notifiRouter.post('/', authMiddleware,admin,addNotification)
notifiRouter.get('/:id',authMiddleware, getUserNotificationsByUserId)

export default notifiRouter;