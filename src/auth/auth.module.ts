import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Users } from "../users/entities/users.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule, 
    UsersModule,
    TypeOrmModule.forFeature([Users]), 
    PassportModule.register({ defaultStrategy: "jwt" }), 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"), 
        signOptions: {
          expiresIn: "1h", 
        },
      }),
    }),
  ],
  exports: [
    AuthService, 
    JwtModule,   
    PassportModule, 
  ],
})
export class AuthModule {}
