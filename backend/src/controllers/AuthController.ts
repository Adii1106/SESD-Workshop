import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService
    }

    public register = async (req: Request, res: Response) => {
        
        try {
                const { username, password } = req.body

                if (!username || !password) {
                    return res.status(400).json({ message: "Username and password required" })
                    }
                
                const user = this.authService.register(username, password)
                res.status(201).json({ message: "User registered", userId: user.getId() })

        }catch(error: any){

            res.status(400).json({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body
            const token = this.authService.login(username, password)
            res.json({ token })
            
        }catch (error: any){

            res.status(401).json({ message: error.message })
        }
    }
}
