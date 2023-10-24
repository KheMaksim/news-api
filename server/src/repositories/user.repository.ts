import { appDataSource } from '@/config/dataSource';
import { AuthUserDto } from '@/dto/auth-user.dto';
import { User } from '@/entities/user.entity';
import { IUser } from '@/interfaces/IUser.interface';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }

    async signIn(signInUserDto: AuthUserDto): Promise<IUser> {
        const user = await this.findOne({ where: { username: signInUserDto.username } });
        if (!user) {
            const error = new Error('User not exist');
            throw error;
        }
        const isMatch = await user.comparePassword(signInUserDto.password);
        if (!isMatch) throw new Error('Login or password is wrong');
        user.generateToken();
        const userWithToken = (await this.save(user)) as unknown as IUser;
        delete userWithToken.password;
        return userWithToken;
    }

    async register(registerUserDto: AuthUserDto): Promise<IUser> {
        const userData = this.create(registerUserDto);
        const user = (await this.save(userData)) as unknown as IUser;
        delete user.password;
        return user;
    }

    async getUserByToken(token: string): Promise<IUser | null> {
        return await this.findOneBy({ token });
    }
}
