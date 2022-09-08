import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { IBook } from './interface/book.interface';

@Injectable()
export class LibraryService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<IBook>){

    }

    async allBooks(): Promise<IBook[]> {
        return await this.bookRepository.find();
    }

    async getAvailableBooks(opt): Promise<IBook[]>{
        return await this.bookRepository.findBy({isAvailable: opt});
    }

    async createBook(book: IBook): Promise<IBook | object> {
        let stat = await this.bookRepository.save(book);
        if(stat) {
            return {data: stat, message: "book created successfully"};
        }
    }


    async addBookImage(id: number, file: Express.Multer.File): Promise<IBook | object> {
        let bookToAddImage = await this.bookRepository.findOneBy({id: id});
        let uploadedFile = file;

        bookToAddImage.bookImageUrl = await uploadedFile.path;

        await this.bookRepository.save(bookToAddImage);
        return  file;
    }



    async getBookImage(id: number): Promise<string> {
        let bookImage = await this.bookRepository.findOneBy({ id: id})

        if(bookImage.bookImageUrl != "") {
            return bookImage.bookImageUrl.split('/')[1];
        } else {
            return bookImage.bookImageUrl='undefined'
        }
    }


    async updateBook(id: number, book: IBook): Promise<IBook>{
        let bookToUpdate = await this.bookRepository.findOneBy({id: id});
        bookToUpdate.authorName = book.authorName;
        bookToUpdate.bookName = book.bookName;
        bookToUpdate.isAvailable = book.isAvailable;
        bookToUpdate.publishYear = book.publishYear;

        
        await this.bookRepository.save(bookToUpdate);
        return bookToUpdate;
    }


    async deleteBook(bookId: number): Promise<IBook | string> {
        const bookToRemove = await this.bookRepository.findOneBy({id: bookId});
        if(bookToRemove){
            await this.bookRepository.remove(bookToRemove);
            return `Book deleted successfully`;
        } else {
            return await `Book with id: ${bookId} not found`;
        }
    }
}

