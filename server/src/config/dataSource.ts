import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { Comment } from '@/entities/comment.entity';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'forum',
    username: 'root',
    password: 'root',
    synchronize: true,
    logging: false,
    entities: [User, Post, Comment],
});
