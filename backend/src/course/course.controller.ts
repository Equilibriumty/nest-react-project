import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: Prisma.CourseCreateManyInput) {
    return this.courseService.create(createCourseDto);
  }

  @Post(':courseId/create-task')
  createTask(
    @Body() createTaskDto: Prisma.TaskCreateManyInput,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.createTask({
      ...createTaskDto,
      courseId: courseId,
    });
  }

  @Put(':courseId/assign/:studentId')
  assign(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    console.log(courseId, studentId);
    return this.courseService.assignStudent(courseId, studentId);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
