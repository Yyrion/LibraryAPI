import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { Borrowing } from './entities/borrowing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BorrowingController],
  providers: [BorrowingService],
  imports: [TypeOrmModule.forFeature([Borrowing]), BookModule, UserModule]
})
export class BorrowingModule {}
