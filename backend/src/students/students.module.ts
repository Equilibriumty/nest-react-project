import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, TeachersService],
  exports: [StudentsService],
})
export class StudentsModule {}
