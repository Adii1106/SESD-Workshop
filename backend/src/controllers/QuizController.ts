import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';

export class QuizController {
    
    private quizService: QuizService;

    constructor(quizService: QuizService) {
        this.quizService = quizService;
    }

    public createQuiz = async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const userId = req.user.userId
            const { title, statements } = req.body


            if (!title || !Array.isArray(statements)) {
                return res.status(400).json({ message: "Invalid input" })
            }

                const quiz = this.quizService.createQuiz(userId, title, statements)

                res.status(201).json({ message: "Quiz created", quizId: quiz.getId() })

        }catch (error: any){

                res.status(400).json({ message: error.message })
        }
    }

    public getAllQuizzes = async (req: Request, res: Response) => {

        const quizzes = this.quizService.getAllQuizzes();
     
        const publicQuizzes = quizzes.map(q => ({
            id: q.getId(),
            title: q.getTitle(),
            creatorId: q.getCreatorId(),
            statements: q.getPublicStatements()
        }))

        res.json(publicQuizzes)
    }

    public getQuizById = async (req: Request, res: Response) => {
        const quiz = this.quizService.getQuizById(req.params.id as string);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" })
        }

        res.json({
            id: quiz.getId(),
            title: quiz.getTitle(),
            creatorId: quiz.getCreatorId(),
            statements: quiz.getPublicStatements()
        })

    }

    public attemptQuiz = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const userId = req.user.userId
            const quizId = req.params.id
            const { selectedStatementIndex } = req.body

            const result = this.quizService.attemptQuiz(userId, quizId as string, selectedStatementIndex)
            res.json(result)

        } catch (error: any) {
            
            res.status(400).json({ message: error.message })
        }
    }
}
