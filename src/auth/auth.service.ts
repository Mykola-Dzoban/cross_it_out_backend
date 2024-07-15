import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import admin from 'firebase-admin';
import ms from 'ms';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Logger } from '../utils/ConsoleLogger';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: FirebaseService,
    private readonly configService: ConfigService<{}, true>,
    private readonly jwtService: JwtService,
  ) {}

  async testFunc() {
    const userRecord = await admin
      .auth()
      .getUserByEmail(process.env.TEST_USER_EMAIL as string);
    if (!userRecord) {
      return {
        error: 'User not found',
      };
    }

    Logger.success('User found', userRecord);

    return userRecord;
  }

  // private getJwtToken(user: Partial<UserSchemaType>, expiresIn: number) {
  //   return this.jwtService.sign(
  //     {
  //       ...user,
  //     },
  //     {
  //       secret: this.configService.get<string>('JWT_SECRET'),
  //       expiresIn,
  //     },
  //   );
  // }

  async login(authLoginDto: AuthLoginDto) {
    const userRecord = await admin.auth().getUserByEmail(authLoginDto.email);
    if (!userRecord) {
      return {
        error: 'User not found',
      };
    }

    const user = (
      await this.db.users.query((ref) =>
        ref.where('email', '==', authLoginDto.email),
      )
    )?.[0];
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const expiresIn = ms('14d');
    // const token = this.getJwtToken(user, expiresIn);
    return {
      token: 'vsdwsv',
      role: user.role,
      id: user.id,
      userOwnerId: user.userOwnerId,
      expiresIn,
      image: !!user.image ? user.image : userRecord.photoURL,
      emailVerified: userRecord.emailVerified,
    };
  }
}
