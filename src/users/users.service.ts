import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export class EmailNotFoundException extends Error {
  constructor(
    message: string = 'User with the provided email does not exist.',
  ) {
    super(message);
    this.name = 'EmailNotFoundException';
  }
}

export class InvalidPasswordException extends Error {
  constructor(message: string = 'The provided password is incorrect.') {
    super(message);
    this.name = 'InvalidPasswordException';
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  async registerUser(userData: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword, // 해싱된 비밀번호로 교체
    });
    return newUser.save();
  }
  async authenticateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    // const user = await this.userModel.findOne({ $where: email }).exec();
    if (!user) throw new BadRequestException('존재하지 않는 이메일 입니다.');
    const isSamePassword = await this.comparePasswords(password, user.password);
    if (!isSamePassword)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    return true;
  }
}
