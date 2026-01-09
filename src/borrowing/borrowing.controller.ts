import { Controller, Get, Post, Body, Put, Param, Delete, Session, ForbiddenException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LibrarianGuard } from 'src/guards/librarian.guard';

@Controller('borrow')
@UseGuards(AuthGuard)
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  create(@Body() createBorrowingDto: CreateBorrowingDto, @Session() session) {
    if (!session || !session.userId) throw new UnauthorizedException();
    return this.borrowingService.create(createBorrowingDto, session.userId);
  }

  @Get()
  @UseGuards(LibrarianGuard)
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  @UseGuards(LibrarianGuard)
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(id);
  }

  @Put('/return/:id')
  @UseGuards(LibrarianGuard)
  returnBorrow(@Param('id') id: string) {
    return this.borrowingService.borrowReturned(id);
  }

  @Put(':id')
  @UseGuards(LibrarianGuard)
  update(@Param('id') id: string, @Body() updateBorrowingDto: UpdateBorrowingDto) {
    return this.borrowingService.update(id, updateBorrowingDto);
  }

  @Delete(':id')
  @UseGuards(LibrarianGuard)
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(id);
  }
}
