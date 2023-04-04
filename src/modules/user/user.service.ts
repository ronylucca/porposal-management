import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description Creates User
   * @param CreateUserDto
   * @returns {User}
   * @emits BadRequestException
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    };

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (userAlreadyExists) {
      throw new BadRequestException('User already exists!');
    }
    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return { ...user, password: undefined };
  }

  /**
   * @description Creates Product
   * @param CreateUserDto
   * @returns {User}
   * @emits BadRequestException
   */
  async update(dto: CreateUserDto, id: number): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not update user - ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'User could not be updated. Check data request',
      );
    }
  }
}
