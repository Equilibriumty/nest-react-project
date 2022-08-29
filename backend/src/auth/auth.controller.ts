import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { LoginTeacherDto } from 'src/teachers/dto/teacher-login.dto';
import { LoginStudentDto } from 'src/students/dto/login-student.dto';
import { TeacherExistsGuard } from 'src/guards/teacher.guard';
import { StudentExistsGuard } from 'src/guards/student.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registerTeacher')
  @UseGuards(TeacherExistsGuard)
  async registerTeacher(
    @Body(new ValidationPipe()) createTeacherDto: CreateTeacherDto,
  ) {
    return this.authService.registerTeacher(createTeacherDto);
  }

  @Post('/registerStudent')
  @UseGuards(StudentExistsGuard)
  async registerStudent(
    @Body(new ValidationPipe()) createStudentDto: CreateStudentDto,
  ) {
    return this.authService.registerStudent(createStudentDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/loginTeacher')
  async loginTeacher(
    @Body(new ValidationPipe()) loginTeacherDto: LoginTeacherDto,
  ) {
    return this.authService.loginTeacher(loginTeacherDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/loginStudent')
  async loginStudent(
    @Body(new ValidationPipe()) loginStudentDto: LoginStudentDto,
  ) {
    return this.authService.loginStudent(loginStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
