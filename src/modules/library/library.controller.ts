import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, } from 'path';
import { UpdateResult } from 'typeorm';
import { AdminRoleGuard } from '../auth/admin-role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { Book } from './entities/book.entity';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private libraryService: LibraryService){

    }

    // Get all books

    @Get('/book')
    async findAll(): Promise<Book[]> {
        return await this.libraryService.allBooks();
    }

    // Get all available books

    @Get('/book/available')
    async getAvailableBooks(): Promise<Book[] | string> {
        return await this.libraryService.getAvailableBooks();
    }


    // Create new book

    @Post('/book')
    @UseGuards(AdminRoleGuard)
    async createBook(@Body() createBookDto: CreateBookDto): Promise <Book | object> {
        return this.libraryService.createBook(createBookDto);
    }

    // add book image via book id

    @Post("upload/:bookId")
    @UseInterceptors(
        FileInterceptor("photo", {
            storage: diskStorage({
                destination: './uploads', 
                filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
              }
              })
        })
    )
    async addBookImage(@UploadedFile() file, @Param('bookId') bookId): Promise<any>{
        return await this.libraryService.addBookImage(bookId, file)
    }


    // update book via id

    @Put('/book/:id')
    async updateBook(@Body() updateBookPayload: UpdateBookDto, @Param('id') id): Promise<UpdateResult | object> {
        return await this.libraryService.updateBook(id, updateBookPayload);
    }

    // delete book via id

    @Delete('/book/:id')
    async deleteBook(@Param('id') id: number): Promise<object | NotFoundException> {
        return await this.libraryService.deleteBook(id);
    }

  
}
