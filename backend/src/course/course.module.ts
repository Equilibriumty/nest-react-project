import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, TeachersService],
})
export class CourseModule {}
