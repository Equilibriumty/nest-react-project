import { Injectable, UseGuards } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { StudentExistsGuard } from 'src/guards/student.guard';
import { PrismaService } from 'src/prisma.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private teacherService: TeachersService,
  ) {}

  @UseGuards(StudentExistsGuard)
  async create(data: Prisma.StudentCreateInput): Promise<Student> {
    return await this.prisma.student.create({ data: data });
  }

  async findAll(): Promise<Student[]> {
    return await this.prisma.student.findMany({ include: { courses: true } });
  }

  async findById(id: string): Promise<Student> {
    return await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(
    studentWhereUniqueInput: Prisma.StudentWhereUniqueInput,
  ): Promise<Student> {
    return await this.prisma.student.findUnique({
      where: {
        email: studentWhereUniqueInput.email,
      },
    });
  }

  async update(
    where: Prisma.StudentWhereUniqueInput,
    data: Prisma.StudentUpdateInput,
  ) {
    return await this.prisma.student.update({
      where: {
        id: where.id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(where: Prisma.StudentWhereUniqueInput) {
    return await this.prisma.student.delete({
      where: {
        id: where.id,
      },
    });
  }
}
