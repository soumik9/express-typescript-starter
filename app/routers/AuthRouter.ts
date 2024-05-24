import express from 'express'
const router = express.Router();

// middlewares
import auth from '../middleware/auth';

// controllers
import AuthController from '../controllers/AuthController';

//routes
router.post('/signin', AuthController.Signin);
router.get('/profile', auth(), AuthController.Profile);

export const AuthRouter = router;