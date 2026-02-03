export class Attempt {
    private id: string
    private quizId: string
    private userId: string
    private success: boolean
    private timestamp: Date

    constructor(id: string, quizId: string, userId: string, success: boolean) {
        this.id = id
        this.quizId = quizId
        this.userId = userId
        this.success = success
        this.timestamp = new Date()
    }

    public getId(): string {
        return this.id
    }

    public getQuizId(): string {
        return this.quizId
    }

    public getUserId(): string {
        return this.userId
    }

    public isSuccess(): boolean {
        return this.success
    }

    public getTimestamp(): Date {
        return this.timestamp
    }
}
