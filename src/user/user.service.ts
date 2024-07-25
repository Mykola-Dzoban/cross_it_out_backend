import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Logger } from 'src/utils/ConsoleLogger';

@Injectable()
export class UserService {
  constructor(private readonly db: FirebaseService) {}

  async getUserById(userId: string) {
    Logger.debug(userId);
    const user = await this.db.users.getById(userId);
    if (!user) {
      Logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    Logger.debug(user);
    return user;
  }
}
