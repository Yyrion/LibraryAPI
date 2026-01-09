import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  async create(createBookDto: CreateBookDto) {

    const book = await this.repo.create({ISBN:createBookDto.ISBN, title: createBookDto.title,
      author: createBookDto.author,
      editor: createBookDto.editor,
      publication_year: createBookDto.publication_year,
      available_amount: createBookDto.total_amount,
      total_amount: createBookDto.total_amount
    })
    return this.repo.save(book);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {

    const book = await this.repo.findOne({
      where: {
        "id": id
      }
    })

    if (!book) {
      throw new NotFoundException()
    }

    return book;
  }

  async update(id: string, newData: Partial<Book>) {

    const book = await this.repo.findOne({
      where: {
        "id": id
      }
    })

    if (!book) {
      throw new NotFoundException()
    }

    Object.assign(book, newData)
    return this.repo.save(book);
  }

  async remove(id: string) {

     const book = await this.repo.find({
      where: {
        "id": id
      }
    })

    if (!book) {
      throw new NotFoundException()
    }

    return this.repo.remove(book);
  }
}
