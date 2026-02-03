import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { QuizController } from './controllers/QuizController';
import { AuthService } from './services/AuthService';
import { QuizService } from './services/QuizService';
import { JsonUserRepository } from './repositories/UserRepository';
import { JsonQuizRepository } from './repositories/QuizRepository';
import { authMiddleware } from './middleware/auth.middleware';


const userRepo = new JsonUserRepository();
const quizRepo = new JsonQuizRepository();

const authService = new AuthService(userRepo);
const quizService = new QuizService(quizRepo);

const authController = new AuthController(authService);
const quizController = new QuizController(quizService);


export const authRouter = Router();
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);


export const quizRouter = Router();
quizRouter.get('/', (req, res) => quizController.getAllQuizzes(req, res));
quizRouter.post('/', authMiddleware, (req, res) => quizController.createQuiz(req, res));
quizRouter.get('/:id', (req, res) => quizController.getQuizById(req, res));
quizRouter.post('/:id/attempt', authMiddleware, (req, res) => quizController.attemptQuiz(req, res));
