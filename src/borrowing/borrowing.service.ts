import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { BookService } from 'src/book/book.service';
import { Borrowing } from './entities/borrowing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BorrowingService {
  constructor(@InjectRepository(Borrowing) private repo: Repository<Borrowing>, private readonly bookService: BookService, private readonly userService: UserService) {}

  async create(createBorrowingDto: CreateBorrowingDto, userId: string) {

    const book = await this.bookService.findOne(createBorrowingDto.bookId);
    console.log(book, createBorrowingDto)

    if (book.available_amount <= 0) {
      throw new NotFoundException()
    } else {
      await this.bookService.borrow(book.id, -1);
    }
    
    const user = await this.userService.findOne(userId);

    if (!book || !user) {
      throw new NotFoundException();
    }

    const currentDate = new Date();
    const deadline = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const borrow = this.repo.create({user: user, book: book, borrow_date: currentDate, deadline_date: deadline});

    return this.repo.save(borrow);
  }

  async findAll() {
    const borrows = await this.repo.find();
    return borrows;
  }

  async findOne(id: string) {
    const borrow = await this.repo.findOne({
      where: { id: id },
      relations: ['book', 'user'],
    })

    if (!borrow) throw new NotFoundException();
    return borrow;
  }

  async update(id: string, newData: Partial<Borrowing>) {

    const borrow = await this.findOne(id);

    Object.assign(borrow, newData)
    return this.repo.save(borrow);
  }

  async remove(id: string) {
    const borrow = await this.findOne(id);

    return this.repo.remove(borrow);
  }

  async borrowReturned(id: string) {
    const newData = {status: 'RETURNED', deadline_date: new Date()};

    const borrow = await this.findOne(id);
    await this.bookService.borrow(borrow.book.id, 1);

    Object.assign(borrow, newData)
    return this.repo.save(borrow);
  }
}
