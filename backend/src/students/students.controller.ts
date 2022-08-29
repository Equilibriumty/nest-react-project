import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.studentsService.findById(id);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateStudentDto: Prisma.StudentUpdateInput,
  ) {
    return this.studentsService.update({ id: id }, updateStudentDto);
  }

  @Put('/assign/:id')
  assign(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query() query: { courseId: number },
  ) {
    return this.studentsService.assignToACourse({ id: id }, +query.courseId);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.studentsService.remove({ id: id });
  }
}
