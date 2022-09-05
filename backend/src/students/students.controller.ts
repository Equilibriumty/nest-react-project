import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: Prisma.StudentCreateInput) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/find')
  findByEmail(@Query() query: { email: string }) {
    return this.studentsService.findOne({ email: query.email });
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.studentsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateStudentDto: Prisma.StudentUpdateInput,
  ) {
    return this.studentsService.update({ id: id }, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove({ id: id });
  }
}
