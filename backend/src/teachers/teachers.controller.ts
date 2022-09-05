import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @Post('/:teacherId/create-course')
  createCourse(
    @Body()
    createCourseDto: Prisma.CourseCreateInput,
    @Param('teacherId') teacherId: string,
  ) {
    return this.courseService.create({
      ...createCourseDto,
      teacherId: teacherId,
    });
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get('/find')
  findByEmail(@Query() query: { email: string }) {
    return this.teachersService.findOne({ email: query.email });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update({ id: id }, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove({ id: id });
  }
}
