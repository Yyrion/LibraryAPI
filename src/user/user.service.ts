import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//ENTITIES
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/encrypt';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email, password, surname, lastname) {
    const newData = {
      email: email, 
      password:password, 
      surname: surname, 
      lastname: lastname,
      creation_date: new Date(),
      modification_date: new Date(),
      whiteliststatus: true
    }

    const user = this.repo.create(newData)
    return this.repo.save(user);
  }

  async update(id: string, newData:Partial<User>) {

    const user = await this.repo.findOne({
      where: { "id": id },
    });

    if (!user) {
      throw new NotFoundException()
    }

    if (newData && newData.password) {
      newData.password = await hashPassword(newData.password)
    }

    newData.modification_date = new Date();

    Object.assign(user, newData)
    return this.repo.save(user);
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({
      where: { "id": id },
    });

    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({
      where: { "email": email },
    });

    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  async findIfEmailIsUsed(email: string): Promise<boolean> {
    const user = await this.repo.findOne({
      where: { "email": email },
    });

    if (!user) {
      return false
    }

    return true;
  }

  async remove(id: string) {
    const user = await this.repo.findOne({
      where: { "id": id },
    });

    if (!user) {
      throw new NotFoundException()
    }
   
    return this.repo.remove(user);
  }
}
