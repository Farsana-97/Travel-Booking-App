import express from 'express'
import upload from '../middlewares/multer.js'
import { addDestination, deleteDestination, editDestination, getAllDestinations } from '../controllers/destinationController.js';
import { admin, authMiddleware } from '../middlewares/authMiddleware.js';

const destiRouter = express.Router()

destiRouter.post('/',upload.single("image"),authMiddleware,admin, addDestination)
destiRouter.get('/',authMiddleware,getAllDestinations)
destiRouter.put("/:id", upload.single("image"),authMiddleware,admin, editDestination);
destiRouter.delete("/:id",authMiddleware,admin, deleteDestination);


export default destiRouter;