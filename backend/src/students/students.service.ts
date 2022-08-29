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
    return await this.prisma.student.findMany({});
  }

  async findById(id: number): Promise<Student> {
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

  async assignToACourse(
    studentId: Prisma.TeacherWhereUniqueInput,
    courseId: number,
  ) {
    const updatedStudent = await this.prisma.student.updateMany({
      where: {
        id: studentId.id,
      },
      data: {
        courseId: courseId,
      },
    });

    return await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        students: true,
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
