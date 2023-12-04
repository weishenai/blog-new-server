import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../common/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserValidateService } from './user-validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserValidateService],
  exports: [UserService],
})
export class UserModule {}
