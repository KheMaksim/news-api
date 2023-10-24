export default interface IComment {
    id: number;
    userId: string;
    postId: string;
    text: string;
    datetime: Date;
}
