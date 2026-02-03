import { Statement } from './Statement';

export class Quiz {
    private id: string
    private creatorId: string
    private title: string
    private statements: Statement[]

    constructor(id: string, creatorId: string, title: string, statements: Statement[]) {

        if (statements.length !== 3) {
            throw new Error("A quiz must have exactly 3 statements.")
        }

        const lies = statements.filter(s => s.checkIsLie())
        if (lies.length !== 1) {
            throw new Error("A quiz must have exactly one lie.")
        }

        this.id = id
        this.creatorId = creatorId
        this.title = title
        this.statements = statements
    }

    public getId(): string {
        return this.id
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public getTitle(): string {
        return this.title
    }

    public getStatements(): Statement[] {
        return this.statements
    }


    public getPublicStatements(): { text: string; id: number }[] {
        return this.statements.map((s, index) => ({
            text: s.getText(),
            id: index
        }))
    }

    public checkAnswer(statementIndex: number): boolean {
        if (statementIndex < 0 || statementIndex >= this.statements.length) {
            return false
        }
        return this.statements[statementIndex].checkIsLie()
    }
}
