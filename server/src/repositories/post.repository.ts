import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Post } from '@/entities/post.entity';
import { PostDto } from '@/dto/post.dto';
import IPost from '@/interfaces/IPost.interface';

export class PostRepository extends Repository<Post> {
    constructor() {
        super(Post, appDataSource.createEntityManager());
    }

    async getPost(): Promise<Post[]> {
        return await this.find({
            relations: { user: true },
            order: { datetime: 'DESC' },
        });
    }

    async getPostById(id: number): Promise<Post | undefined> {
        return (
            (await this.findOne({
                where: { id },
                relations: { user: true },
            })) || undefined
        );
    }

    async createPost(postDto: PostDto): Promise<IPost> {
        const post = {
            ...postDto,
            datetime: new Date(),
        };
        return await this.save(post);
    }

    async deletePost(id: number): Promise<void> {
        await this.delete(id);
    }
}
