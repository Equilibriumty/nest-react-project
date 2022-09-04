import { Injectable, UseGuards } from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { TeacherExistsGuard } from 'src/guards/teacher.guard';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  @UseGuards(TeacherExistsGuard)
  async create(data: Prisma.TeacherCreateInput): Promise<Teacher> {
    return await this.prisma.teacher.create({ data: data });
  }

  async findAll(): Promise<Teacher[]> {
    return await this.prisma.teacher.findMany({
      include: {
        courses: true,
      },
    });
  }

  async findById(id: string): Promise<Teacher> {
    return await this.prisma.teacher.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(teacher: Prisma.TeacherWhereUniqueInput): Promise<Teacher> {
    return await this.prisma.teacher.findUnique({
      where: {
        email: teacher.email,
      },
    });
  }

  async update(
    where: Prisma.TeacherWhereUniqueInput,
    data: Prisma.TeacherUpdateInput,
  ) {
    return await this.prisma.teacher.update({
      where: {
        id: where.id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(where: Prisma.TeacherWhereUniqueInput) {
    return await this.prisma.teacher.delete({
      where: {
        id: where.id,
      },
    });
  }
}
