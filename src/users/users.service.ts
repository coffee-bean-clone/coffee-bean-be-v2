import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserJoinRequestDTO } from './dto/UserJoinRequestDTO';
import { UserLoginRequestDTO } from './dto/UserLoginRequestDTO';

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

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async joinUser(userJoinRequestDTO: UserJoinRequestDTO) {
    const isSameEmail = await this.userModel.findOne({
      email: userJoinRequestDTO.email,
    });
    const isSamePhoneNumber = await this.userModel.findOne({
      phoneNumber: userJoinRequestDTO.phoneNumber,
    });

    if (isSameEmail) throw new BadRequestException('동일한 이메일이 있습니다.');
    if (isSamePhoneNumber)
      throw new BadRequestException('동일한 휴대폰 번호가 있습니다.');

    try {
      const password = await this.hashingPassword(userJoinRequestDTO.password);
      const newUser = new this.userModel({
        ...userJoinRequestDTO,
        password: password,
      });
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException('통신 에러가 발생했습니다.');
    }
  }
  async authenticateUser(userLoginRequestDTO: UserLoginRequestDTO) {
    const user = await this.userModel.findOne({
      email: userLoginRequestDTO.email,
    });

    if (!user) throw new BadRequestException('존재하지 않는 이메일 입니다.');

    const isMatch = await this.comparePasswords(
      userLoginRequestDTO.password,
      user.password,
    );
    if (!isMatch)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    return user;
  }
  async findUser(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) return null;
    return user;
  }
}
