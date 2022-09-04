import { Injectable, PipeTransform } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCourseDto: Prisma.CourseCreateManyInput): Promise<Course> {
    return await this.prisma.course.create({ data: createCourseDto });
  }

  async findAll() {
    return await this.prisma.course.findMany({
      include: { students: true, tasks: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.course.findUnique({
      where: { id: id },
      include: { students: true, tasks: true },
    });
  }

  async createTask(createTaskDto: Prisma.TaskCreateManyInput) {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: {
        id: id,
      },
      data: {
        ...updateCourseDto,
      },
    });
  }

  async assignStudent(courseId: string, studentId: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        courses: true,
      },
    });

    const updatedCourse = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        students: true,
      },
    });
    updatedCourse.students.push(student);
    return updatedCourse;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
