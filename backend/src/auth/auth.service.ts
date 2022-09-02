import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTeacherDto } from 'src/teachers/dto/create-teacher.dto';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { TeachersService } from 'src/teachers/teachers.service';
import { StudentsService } from 'src/students/students.service';
import { LoginStudentDto } from 'src/students/dto/login-student.dto';
import { LoginTeacherDto } from 'src/teachers/dto/teacher-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
  ) {}

  async validateStudent(email: string, pass: string) {
    const user = await this.studentsService.findOne({ email: email });
    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async validateTeacher(email: string, pass: string) {
    const user = await this.teachersService.findOne({ email: email });
    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
    });
  }

  async registerTeacher(dto: CreateTeacherDto) {
    const { password, ...user } = await this.teachersService.create(dto);
    return {
      ...user,
      token: this.generateJwtToken(user),
    };
  }

  async registerStudent(dto: CreateStudentDto) {
    const { password, ...user } = await this.studentsService.create(dto);
    return {
      ...user,
      token: this.generateJwtToken(user),
    };
  }

  async loginTeacher(teacher: LoginTeacherDto) {
    return {
      ...teacher,
      token: this.generateJwtToken(teacher),
    };
  }

  async loginStudent(student: LoginStudentDto) {
    return {
      ...student,
      token: this.generateJwtToken(student),
    };
  }
}
