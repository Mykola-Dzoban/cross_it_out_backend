import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { FirebaseService } from '@/firebase/firebase.service'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Module({
    controllers: [AuthController],
    providers: [AuthService, FirebaseService, JwtService],
})
export class AuthModule {}
