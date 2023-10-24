import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '@/service/auth.service';
import { AuthUserDto } from '@/dto/auth-user.dto';

export class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    register: RequestHandler = async (req, res) => {
        try {
            const registerUserDto = plainToInstance(AuthUserDto, req.body);
            const user = await this.service.register(registerUserDto);
            return res.send(user);
        } catch (e) {
            if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ error: { message: 'User already exists.' } });
            }
            return res.status(500).send({ error: { message: 'Internal server error.' } });
        }
    };

    signIn: RequestHandler = async (req, res) => {
        try {
            const signInUserDto = plainToInstance(AuthUserDto, req.body);
            const user = await this.service.signIn(signInUserDto);
            return res.send(user);
        } catch (err) {
            return res.status(400).send({ error: { message: (err as Error).message } });
        }
    };
}
