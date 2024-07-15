import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, JwtService],
})
export class AuthModule {}
