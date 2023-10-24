import { PostController } from '@/controllers/post.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { Router } from 'express';
import { upload } from '@/middlewares/upload';
import { authValidate } from '@/middlewares/auth.middleware';

export class PostRouter implements IRoute {
    path: string = '/post';
    router: Router = Router();
    private controller: PostController;

    constructor() {
        this.controller = new PostController();
        this.init();
    }

    private init() {
        this.router.get('/', this.controller.getPost);
        this.router.get('/:id', this.controller.getPostById);
        this.router.post('/', authValidate, upload.single('image'), this.controller.createPost);
        this.router.delete('/:id', this.controller.deletePost);
    }
}
