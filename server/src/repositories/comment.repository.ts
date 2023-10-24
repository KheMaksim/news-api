import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Comment } from '@/entities/comment.entity';
import { CommentDto } from '@/dto/comment.dto';
import IComment from '@/interfaces/IComment.interface';

export class CommentRepository extends Repository<Comment> {
    constructor() {
        super(Comment, appDataSource.createEntityManager());
    }

    async getComments(postId: number): Promise<Comment[]> {
        return await this.find({
            relations: { user: true },
            where: { postId: postId.toString() },
            order: { datetime: 'DESC' },
        });
    }

    async createComment(commentDto: CommentDto): Promise<IComment> {
        const comment = {
            ...commentDto,
            datetime: new Date(),
        };
        return await this.save(comment);
    }

    async deleteComment(id: number): Promise<void> {
        await this.delete(id);
    }
}
