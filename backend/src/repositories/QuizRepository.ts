import { Quiz } from '../models/Quiz'
import { Statement } from '../models/Statement'
import { Attempt } from '../models/Attempt'
import fs from 'fs'
import path from 'path'

export interface IQuizRepository {
    save(quiz: Quiz): void
    findAll(): Quiz[]
    findById(id: string): Quiz | undefined
    delete(id: string): void
    saveAttempt(attempt: Attempt): void
}

export class JsonQuizRepository implements IQuizRepository {

    private quizPath = path.join(__dirname, '../../data/quizzes.json')
    private attemptPath = path.join(__dirname, '../../data/attempts.json')

    constructor() {
        if (!fs.existsSync(this.attemptPath)) {
            fs.writeFileSync(this.attemptPath, '[]')
        }
    }

    private loadQuizzes(): any[] {
        if (!fs.existsSync(this.quizPath)) return []
        const data = fs.readFileSync(this.quizPath, 'utf-8')
        return JSON.parse(data || '[]')
    }

    private saveQuizzes(quizzes: any[]): void {
        fs.writeFileSync(this.quizPath, JSON.stringify(quizzes, null, 2))
    }

    public save(quiz: Quiz): void {
        const quizzes = this.loadQuizzes();
        const quizData = {
            id: quiz.getId(),
            creatorId: quiz.getCreatorId(),
            title: quiz.getTitle(),
            statements: quiz.getStatements().map((s: any) => ({ text: s.getText(), isLie: s.checkIsLie() }))
        };
        quizzes.push(quizData);
        this.saveQuizzes(quizzes);
    }

    public findAll(): Quiz[] {
        const data = this.loadQuizzes();
        return data.map(q => {
            const statements = q.statements.map((s: any) => new Statement(s.text, s.isLie))
            return new Quiz(q.id, q.creatorId, q.title, statements)
        });
    }

    public findById(id: string): Quiz | undefined {
        return this.findAll().find(q => q.getId() === id)
    }

    public delete(id: string): void {
        const quizzes = this.loadQuizzes().filter(q => q.id !== id)
        this.saveQuizzes(quizzes)
    }

    public saveAttempt(attempt: Attempt): void {
        const attempts = JSON.parse(fs.readFileSync(this.attemptPath, 'utf-8'))
        attempts.push({
            id: attempt.getId(),
            quizId: attempt.getQuizId(),
            userId: attempt.getUserId(),
            success: attempt.isSuccess(),
            timestamp: attempt.getTimestamp()
        });
        fs.writeFileSync(this.attemptPath, JSON.stringify(attempts, null, 2))
    }
}
