import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { BorrowingModule } from './borrowing/borrowing.module';
import { Borrowing } from './borrowing/entities/borrowing.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Book, Borrowing],
    synchronize: true
  }), UserModule, BookModule, BorrowingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
