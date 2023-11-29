import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this._repo.create({ email, password });
    return this._repo.save(user);
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Id must be an integer');
    }
    const user = await this._repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  find(email: string) {
    return this._repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    if (isNaN(id)) {
      throw new BadRequestException('Id must be an integer');
    }
    let user = await this._repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user = Object.assign(user, attrs);
    return this._repo.save(user);
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Id must be an integer');
    }
    const user = await this._repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this._repo.remove(user);
  }
}

// @InjectRepository(User) - used to help dependency injector to deal with generics, Repository<User> in this case.
