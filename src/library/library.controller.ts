import { Body, Controller, Delete, Get, Header, Headers, Next, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, } from 'path';
import { CreateBookDto } from './dto/createBook.dto';
import { IBook } from './interface/book.interface';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private libraryService: LibraryService){

    }

    // Get all books

    @Get('/book')
    findAll(): Promise<IBook[]> {
        return this.libraryService.allBooks();
    }

    // Get all available books

    @Get('/book/available')
    getAvailableBooks(): Promise<IBook[]> {
        return this.libraryService.getAvailableBooks(true);
    }

    // Get book image from book id

    @Get('/book/image/:id')
    async getBookImage(@Param('id') id, @Res() res): Promise<any>{
        let filename = await this.libraryService.getBookImage(id);
       
        await res.sendFile(filename, {root: 'uploads'})
        
    }


    // Create new book

    @Post('/book')
    createBook(@Body() createBookDto: CreateBookDto): Promise <IBook | object> {
        return this.libraryService.createBook(createBookDto);
    }

    // add book image via book id

    @Post("upload/:id")
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
    async addBookImage(@UploadedFile() file, @Param('id') id): Promise<any>{
        return await this.libraryService.addBookImage(id, file)
    }


    // update book via id

    @Put('/book/:id')
    updateBook(@Body() updateBookDto: CreateBookDto, @Param('id') id): Promise<IBook> {
        return this.libraryService.updateBook(id, updateBookDto);
    }

    // delete book via id

    @Delete('/book/:id')
    deleteBook(@Param('id') id): Promise<IBook | string> {
        return this.libraryService.deleteBook(id);
    }

  
}
