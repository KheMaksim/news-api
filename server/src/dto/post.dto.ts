import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле title обязательное' })
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    description?: string;

    @Expose()
    @IsOptional()
    image?: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле userId обязательное' })
    @IsString()
    userId!: string;
}
