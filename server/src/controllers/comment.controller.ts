import { CommentService } from '@/service/comment.service';
import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { CommentDto } from '@/dto/comment.dto';
import { IRequest } from '@/interfaces/default/IRequest';
import { formatErrors } from '@/helpers/formatErrors';

export class CommentController {
    private service: CommentService;

    constructor() {
        this.service = new CommentService();
    }

    getComments: RequestHandler = async (req, res) => {
        const postId = req.params.id;
        try {
            if (isNaN(Number(postId)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.getComments(Number(postId)));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createComment: RequestHandler = async (req: IRequest, res) => {
        const postId = req.body.postId;
        const text = req.body.text;
        const commentData = {
            postId,
            text,
            userId: req.user.id,
        };
        const commentDto = plainToClass(CommentDto, commentData, { excludeExtraneousValues: true });
        try {
            const comment = await this.service.createComment(commentDto);
            return res.send(comment);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    deleteComment: RequestHandler = async (req, res) => {
        try {
            await this.service.deleteComment(Number(req.params.id));
            return res.sendStatus(204);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
