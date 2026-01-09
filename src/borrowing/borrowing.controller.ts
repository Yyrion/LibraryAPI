import { Controller, Get, Post, Body, Patch, Param, Delete, Session, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';

@Controller('borrow')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  create(@Body() createBorrowingDto: CreateBorrowingDto, @Session() session) {
    if (!session || !session.userId) throw new UnauthorizedException();
    return this.borrowingService.create(createBorrowingDto, session.userId);
  }

  @Get()
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowingDto: UpdateBorrowingDto) {
    return this.borrowingService.update(id, updateBorrowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(id);
  }
}
