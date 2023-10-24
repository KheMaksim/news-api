import { PostService } from '@/service/post.service';
import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { PostDto } from '@/dto/post.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/default/IRequest';

export class PostController {
    private service: PostService;

    constructor() {
        this.service = new PostService();
    }

    getPost: RequestHandler = async (req, res) => {
        try {
            return res.send(await this.service.getPost());
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    getPostById: RequestHandler = async (req, res) => {
        const id = Number(req.params.id);
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.getPostById(id));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createPost: RequestHandler = async (req: IRequest, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;
        const postData = {
            title,
            description,
            image,
            userId: req.user.id,
        };
        const postDto = plainToClass(PostDto, postData, { excludeExtraneousValues: true });
        if (req.file) postDto.image = req.file.filename;
        try {
            if (!postDto.title || !postDto.userId) throw new Error('Invalid title or userId field!');
            if (req.file === undefined && postDto.description === undefined) throw new Error('Image or description are required!');
            const post = await this.service.createPost(postDto);
            res.send(post);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    deletePost: RequestHandler = async (req, res) => {
        const id = Number(req.params.id);
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.deletePost(id));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
