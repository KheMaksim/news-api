export default interface IPost {
    id: number;
    title: string;
    description?: string;
    image?: string;
    userId: string;
    datetime: Date;
}
