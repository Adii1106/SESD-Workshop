export class Statement {
    private text: string
    private isLie: boolean

    constructor(text: string, isLie: boolean) {
        this.text = text
        this.isLie = isLie
    }

    public getText(): string {
        return this.text
    }

    public checkIsLie(): boolean {
        return this.isLie
    }
}
