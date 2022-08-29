import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCourseDto: Prisma.CourseCreateInput): Promise<Course> {
    return await this.prisma.course.create({ data: createCourseDto });
  }

  async findAll() {
    return await this.prisma.course.findMany({
      include: { students: true, tasks: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.course.findUnique({
      where: { id: id },
      include: { students: true, tasks: true },
    });
  }

  async createTask(createTaskDto: Prisma.TaskCreateInput) {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: {
        id: id,
      },
      data: {
        ...updateCourseDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
