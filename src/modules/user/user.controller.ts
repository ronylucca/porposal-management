import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @IsPublic()
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getById(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserDto })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateUserDto,
  ): Promise<User> {
    console.log(id);
    return await this.userService.update(dto, Number(id));
  }
}
