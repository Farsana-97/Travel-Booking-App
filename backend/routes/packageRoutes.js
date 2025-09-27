import express from 'express'
import upload from '../middlewares/multer.js'
import { addPackage, deletePackage, editPackage, getAllPackages, getPackageById } from '../controllers/packageController.js'
import { admin, authMiddleware } from '../middlewares/authMiddleware.js'


const packageRouter = express.Router()

packageRouter.post('/add',upload.array("images",6),authMiddleware,admin, addPackage)
packageRouter.get('/',authMiddleware,getAllPackages)
packageRouter.get('/:id',authMiddleware,getPackageById)
packageRouter.put("/:id", upload.array("images",6),authMiddleware,admin,editPackage );
packageRouter.delete("/:id",authMiddleware,admin,deletePackage );


export default packageRouter;