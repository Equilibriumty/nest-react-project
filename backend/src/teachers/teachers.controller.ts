import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CourseService } from 'src/course/course.service';
import { Prisma } from '@prisma/client';

@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Post('/create-course')
  createCourse(@Body() createCourseDto: Prisma.CourseCreateInput) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teachersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update({ id: id }, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teachersService.remove({ id: id });
  }
}
