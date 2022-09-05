import axios, { AxiosInstance } from 'axios';
import {
  Student,
  StudentLog,
  StudentReg,
  Teacher,
  TeacherLog,
  TeacherReg,
} from '../types/types';

export abstract class HttpBase {
  fetchingService: AxiosInstance;
  fetchingServiceWithHeaders: AxiosInstance;
  baseUrl: string;
  constructor(baseUrl = process.env.REACT_APP_API_URL!) {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.fetchingServiceWithHeaders = this.authAxios;
  }
  authAxios = axios.create({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*',
    },
  });

  private getFullApiUrl(specificApiRoute: string) {
    return `${this.baseUrl}${specificApiRoute}`;
  }

  async logStudent(loginStudentApi: string, student: StudentLog) {
    return await this.fetchingServiceWithHeaders.post(
      this.getFullApiUrl(loginStudentApi),
      student
    );
  }
  async logTeacher(loginTeacherApi: string, teacher: TeacherLog) {
    return await this.fetchingServiceWithHeaders.post(
      this.getFullApiUrl(loginTeacherApi),
      teacher
    );
  }
  async regStudent(registerStudentApi: string, student: StudentReg) {
    return await this.fetchingServiceWithHeaders.post(
      this.getFullApiUrl(registerStudentApi),
      student
    );
  }
  async regTeacher(registerTeacherApi: string, teacher: TeacherReg) {
    return await this.fetchingServiceWithHeaders.post<Teacher>(
      this.getFullApiUrl(registerTeacherApi),
      teacher
    );
  }
  async getStudent(getStudentApi: string, id: string, email?: string) {
    if (email) {
      const { data } = await this.fetchingService.get<Student>(
        this.getFullApiUrl(getStudentApi + 'find?email=' + email)
      );
      return data;
    }
    const { data } = await this.fetchingService.get<Student>(
      this.getFullApiUrl(getStudentApi + id)
    );
    return data;
  }
  async getTeacher(getTeacherApi: string, id: string, email?: string) {
    if (email) {
      const { data } = await this.fetchingService.get<Teacher>(
        this.getFullApiUrl(getTeacherApi + 'find?email=' + email)
      );
      return data;
    }
    const { data } = await this.fetchingService.get<Teacher>(
      this.getFullApiUrl(getTeacherApi + id)
    );
    return data;
  }
}
