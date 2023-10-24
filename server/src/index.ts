import 'reflect-metadata';
import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { AuthRouter } from './routes/auth.route';
import { PostRouter } from './routes/post.route';
import { CommentRouter } from './routes/comment.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    routers: [new AuthRouter(), new PostRouter(), new CommentRouter()],
});

app.listen();
