import express, { Router } from 'express'
import MyUserController from '../controller/MyUserController'
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/Validation';



const router = express.Router()
router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser)
router.post('/', jwtCheck, MyUserController.createCurrentUser);
router.put('/' ,jwtParse,validateMyUserRequest, MyUserController.updateCurrentUser)
// router.put('/' ,validateMyUserRequest, MyUserController.updateCurrentUser)
export default router;