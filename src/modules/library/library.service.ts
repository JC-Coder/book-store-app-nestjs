import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Book } from './entities/book.entity';
import * as fs from 'fs';

@Injectable()
export class LibraryService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>){

    }

    // get all books 

    async allBooks(): Promise<Book[]> {
        try{
            return await this.bookRepository.find();
        } catch(err){
            return err;
        }
    }

    // get available books

    async getAvailableBooks(): Promise<Book[] | string>{
 
            let result =  await this.bookRepository.findBy({isAvailable: true});

            if(result.length < 1){
                return "No available book at the moment";
            }

            return result;
       
    }

    // create new book 

    async createBook(book): Promise<Book | object> {
        let stat = await this.bookRepository.save(book);
        if(stat) {
            return {data: stat, message: "book created successfully"};
        }
    }


    // add book image

    async addBookImage(bookId: number, file: Express.Multer.File): Promise<Book | object> {
        let bookToAddImage = await this.bookRepository.findOneBy({id: bookId});
        let uploadedFile = file;

        if(!bookToAddImage){
            // delete uploaded image 
            await fs.unlink(`./uploads/${uploadedFile.filename}`, (err) => {
                if(err) return err;
            });

            throw new NotFoundException(null, `Book with requested id not found`);

        } else {
            // check if book has image . if true delete prev image and upload new one 
            let bookPreviousImage =  bookToAddImage.bookImageUrl;

            if(bookPreviousImage){
                await fs.unlink(`./uploads/${bookPreviousImage}`, (err) => {
                    if(err) return err;
                })
            }

            bookToAddImage.bookImageUrl = uploadedFile.filename;
            bookToAddImage.bookImageOriginalName = uploadedFile.originalname;

            await this.bookRepository.save(bookToAddImage);

            return  file ;
        }
        
    }


    // update book via id 

    async updateBook(id: number, updateBookPayload): Promise<UpdateResult | object>{
        let result = await this.bookRepository.update(id, updateBookPayload);

        if(result.affected == 0){
            throw new NotFoundException(`Not updated successfully, book with id ${id} not found`)
        }   

        return result;
    }


    // delete book via id

    async deleteBook(bookId: number): Promise<object | NotFoundException> {
        const bookToRemove = await this.bookRepository.findOneBy({id: bookId});
        if(bookToRemove){
            await this.bookRepository.remove(bookToRemove);
            return {book: bookToRemove, message: `Book deleted successfully`}
        } else {
            throw new NotFoundException( `Book with id: ${bookId} not found`);
        }
    }
}

