import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CommentDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле userId обязательное' })
    @IsNumberString()
    userId!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле postId обязательное' })
    @IsNumberString()
    postId!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле text обязательное' })
    @IsString()
    text!: string;
}
