import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LibrarianGuard implements CanActivate {
    constructor(private usersService: UserService) {}
 
   async canActivate(context: ExecutionContext): Promise<boolean> {
     const request = context.switchToHttp().getRequest();
     const userId = request.session.userId;
 
     if (!userId) {
       throw new ForbiddenException('Not authenticated');
     }
 
     const user = await this.usersService.findOne(userId);
 
     if (user && user.role !== 'ADMIN' && user.role !== "LIBRARIAN") {
       throw new ForbiddenException('You must be a librarian to access theses datas');
     }
 
     return true;
   }
}
