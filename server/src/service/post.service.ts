import { PostDto } from '@/dto/post.dto';
import { Post } from '@/entities/post.entity';
import IPost from '@/interfaces/IPost.interface';
import { PostRepository } from '@/repositories/post.repository';

export class PostService {
    private repository: PostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    getPost = async (): Promise<Post[]> => {
        return await this.repository.getPost();
    };

    getPostById = async (id: number): Promise<Post | undefined> => {
        return await this.repository.getPostById(id);
    };

    createPost = async (postDto: PostDto): Promise<IPost> => {
        return await this.repository.createPost(postDto);
    };

    deletePost = async (id: number): Promise<void> => {
        return await this.repository.deletePost(id);
    };
}
