import { CommentController } from '@/controllers/comment.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class CommentRouter implements IRoute {
    path: string = '/comments';
    router: Router = Router();
    private controller: CommentController;

    constructor() {
        this.controller = new CommentController();
        this.init();
    }

    private init() {
        this.router.get('/:id', this.controller.getComments);
        this.router.post('/', authValidate, this.controller.createComment);
        this.router.delete('/:id', this.controller.deleteComment);
    }
}
