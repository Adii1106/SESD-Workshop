import { User } from '../models/User'
import fs from 'fs'
import path from 'path'

export interface IUserRepository {
    save(user: User): void
    findByUsername(username: string): User | undefined
    findById(id: string): User | undefined
}

export class JsonUserRepository implements IUserRepository {
    private filePath = path.join(__dirname, '../../data/users.json')

    private loadUsers(): any[] {
        if (!fs.existsSync(this.filePath)) return []
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data || '[]')
    }

    private saveUsers(users: any[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2))
    }

    public save(user: User): void {
        const users = this.loadUsers()
        // @ts-ignore - reaching into private for persistence (simple student way)
        users.push({ id: user.getId(), username: user.getUsername(), passwordHash: user.getPasswordHash() });
        this.saveUsers(users)
    }

    public findByUsername(username: string): User | undefined {

        const users = this.loadUsers()
        const data = users.find(u => u.username === username)
        
        if (!data) return undefined
        return new User(data.id, data.username, data.passwordHash)
    }

    public findById(id: string): User | undefined {

        const users = this.loadUsers()
        const data = users.find(u => u.id === id)

        if (!data) return undefined;
        return new User(data.id, data.username, data.passwordHash);
    }
}
