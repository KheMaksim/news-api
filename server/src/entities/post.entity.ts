import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    image!: string;

    @Column()
    userId!: string;

    @CreateDateColumn()
    datetime!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'CASCADE' })
    comments!: Comment[];
}
