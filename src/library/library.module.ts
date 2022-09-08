import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [LibraryService],
    controllers: [LibraryController],
})
export class LibraryModule {}
