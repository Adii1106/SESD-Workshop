import { User } from '../models/User';
import { IUserRepository } from '../repositories/UserRepository';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export class AuthService {
    private userRepo: IUserRepository;
    private readonly JWT_SECRET = 'simple-secret-key-123'; // Hardcoded for assignment simplicity

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    public register(username: string, password: string): User {
        const existing = this.userRepo.findByUsername(username);
        if (existing) {
            throw new Error("Username already taken");
        }
        // In real app, hash password here.
        const newUser = new User(uuidv4(), username, password);
        this.userRepo.save(newUser);
        return newUser;
    }

    public login(username: string, password: string): string {
        const user = this.userRepo.findByUsername(username);
        if (!user || !user.validatePassword(password)) {
            throw new Error("Invalid credentials");
        }

        return jwt.sign({ userId: user.getId(), username: user.getUsername() }, this.JWT_SECRET, { expiresIn: '1h' });
    }
}
