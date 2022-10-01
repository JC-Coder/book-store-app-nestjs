import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from './modules/library/library.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST || 'localhost',
      username: process.env.MYSQLUSER || 'root',
      // port: +process.env.MYSQLPORT,
      password: process.env.MYSQLPASSWORD || '',
      database: process.env.MYSQLDATABASE || 'nest_db_main',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    }),
    LibraryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
