import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './library/book.entity';
import { LibraryModule } from './library/library.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'nest_db',
      entities: [ Book,  ],
      synchronize: true,
      dropSchema: false
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    LibraryModule,
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
