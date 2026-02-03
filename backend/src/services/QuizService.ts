import { Quiz } from '../models/Quiz';
import { Statement } from '../models/Statement';
import { Attempt } from '../models/Attempt';
import { IQuizRepository } from '../repositories/QuizRepository';
import { v4 as uuidv4 } from 'uuid';

export class QuizService {
    private quizRepo: IQuizRepository;

    constructor(quizRepo: IQuizRepository) {
        this.quizRepo = quizRepo;
    }

    public createQuiz(creatorId: string, title: string, statementsData: { text: string; isLie: boolean }[]): Quiz {
        const statements = statementsData.map(s => new Statement(s.text, s.isLie));
        const quiz = new Quiz(uuidv4(), creatorId, title, statements);
        this.quizRepo.save(quiz);
        return quiz;
    }

    public getAllQuizzes(): Quiz[] {
        return this.quizRepo.findAll();
    }

    public getQuizById(id: string): Quiz | undefined {
        return this.quizRepo.findById(id);
    }

    public attemptQuiz(userId: string, quizId: string, selectedStatementIndex: number): { success: boolean, correctLieIndex: number } {
        const quiz = this.quizRepo.findById(quizId);
        if (!quiz) {
            throw new Error("Quiz not found");
        }

        const isSuccess = quiz.checkAnswer(selectedStatementIndex);
        const attempt = new Attempt(uuidv4(), quizId, userId, isSuccess);
        this.quizRepo.saveAttempt(attempt);

        // Find which one was actually the lie to return to user
        const correctLieIndex = quiz.getStatements().findIndex(s => s.checkIsLie());

        return { success: isSuccess, correctLieIndex };
    }
}
