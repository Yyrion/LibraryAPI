import { IsOptional, IsDate, IsIn } from 'class-validator';

export class UpdateBorrowingDto {

    @IsOptional()
    bookId: string

    @IsOptional()
    userId: string

    @IsOptional()
    @IsDate()
    borrow_date: Date
    
    @IsOptional()
    @IsDate()
    deadline_date: Date

    @IsOptional()
    @IsIn(['ACTIVE','RETURNED','OVERDUE'])
    status: 'ACTIVE'|'RETURNED'|'OVERDUE'
}
