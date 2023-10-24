import { UserRepository } from '@/repositories/user.repository';
import { AuthUserDto } from '@/dto/auth-user.dto';
import { IUser } from '@/interfaces/IUser.interface';

export class AuthService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    register = async (registerUSerDto: AuthUserDto): Promise<IUser> => {
        return await this.repository.register(registerUSerDto);
    };

    signIn = async (singInUserDto: AuthUserDto): Promise<IUser> => {
        return await this.repository.signIn(singInUserDto);
    };

    getUserByToken = async (token: string): Promise<IUser | null> => {
        return await this.repository.getUserByToken(token);
    };
}
