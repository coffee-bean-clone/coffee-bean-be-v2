import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Err } from 'src/shared/error';
import { REQ } from './dto';

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
  async emailCheck(email: string) {
    const isSameEmail = await this.userModel.findOne({
      email: email,
    });
    if (isSameEmail) throw new BadRequestException('동일한 이메일이 있습니다.');
    return true;
  }

  async phoneNumberCheck(phoneNumber: string) {
    const isSamePhoneNumber = await this.userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (isSamePhoneNumber)
      throw new BadRequestException('동일한 휴대폰 번호가 있습니다.');
    return true;
  }

  async localJoin(userJoinRequestDTO: REQ.UserJoinRequestDTO) {
    await this.emailCheck(userJoinRequestDTO.email);
    await this.phoneNumberCheck(userJoinRequestDTO.phoneNumber);

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

  async authenticateUser(userLoginRequestDTO: REQ.UserLoginRequestDTO) {
    const user = await this.userModel.findOne({
      email: userLoginRequestDTO.email,
    });

    if (!user) throw new NotFoundException('존재하지 않는 이메일 입니다.');

    const isMatch = await this.comparePasswords(
      userLoginRequestDTO.password,
      user.password,
    );
    if (!isMatch)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    return user;
  }
  async findUser(email: string) {
    const user = await this.userModel
      .findOne({ email: email })
      .select('-password');
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    console.log(user);
    return user;
  }
  async findUserById(id: string) {
    const existingUser = await this.userModel.findById(id).select('-password');
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return existingUser;
  }
}
