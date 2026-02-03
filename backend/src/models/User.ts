export class User {
    private id: string
    private username: string

    private passwordHash: string

    constructor(id: string, username: string, passwordHash: string) {
        this.id = id
        this.username = username
        this.passwordHash = passwordHash
    }

    public getId(): string {
        return this.id
    }

    public getUsername(): string {
        return this.username
    }

    public getPasswordHash(): string {
        return this.passwordHash
    }

    public validatePassword(password: string): boolean {

        return this.passwordHash === password;
    }
}
