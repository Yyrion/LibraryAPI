import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { LibrarianGuard } from 'src/guards/librarian.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('library')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/new')
  @UseGuards(LibrarianGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('/available')
  findAllAvailable() {
    return this.bookService.findAllAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  @UseGuards(LibrarianGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(LibrarianGuard)
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }
}
