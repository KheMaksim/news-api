import { CommentDto } from '@/dto/comment.dto';
import { Comment } from '@/entities/comment.entity';
import IComment from '@/interfaces/IComment.interface';
import { CommentRepository } from '@/repositories/comment.repository';

export class CommentService {
    private repository: CommentRepository;

    constructor() {
        this.repository = new CommentRepository();
    }

    getComments = async (postId: number): Promise<Comment[]> => {
        return await this.repository.getComments(postId);
    };

    createComment = async (commentDto: CommentDto): Promise<IComment> => {
        return await this.repository.createComment(commentDto);
    };

    deleteComment = async (id: number): Promise<void> => {
        return await this.repository.deleteComment(id);
    };
}
