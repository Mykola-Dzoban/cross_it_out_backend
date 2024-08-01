import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import admin from 'firebase-admin';
import { UserSchemaType } from 'src/utils/schemas/UserSchemas';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthLoginDto } from './dto/auth-login.dto';

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

    return {
      message: 'SUCCESS',
      email: userRecord.email,
      displayName: userRecord.displayName,
    };
  }

  private getJwtToken(user: Partial<UserSchemaType>) {
    return this.jwtService.sign(
      {
        ...user,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  async login(authLoginDto: AuthLoginDto) {
    const userRecord = await admin.auth().getUserByEmail(authLoginDto.email);
    if (!userRecord) {
      throw new HttpException('User not found in system', HttpStatus.NOT_FOUND);
    }

    const user = (
      await this.db.users.query((ref) =>
        ref.where('email', '==', authLoginDto.email),
      )
    )?.[0];

    if (!user) {
      throw new HttpException(
        'User not found in database',
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this.getJwtToken(user);
    return {
      token,
      id: user.id,
    };
  }
}
