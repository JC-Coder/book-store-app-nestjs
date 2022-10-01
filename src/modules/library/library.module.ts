import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Book } from './entities/book.entity';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [LibraryService],
    controllers: [LibraryController],
})
export class LibraryModule {}
