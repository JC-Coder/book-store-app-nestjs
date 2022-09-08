export interface IBook {
    id?: string | number;
    bookName: string;
    authorName: string;
    publishYear: number;
    isAvailable: boolean;
    bookImageUrl?: string
    bookImageType?: string
}