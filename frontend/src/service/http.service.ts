import axios, { AxiosInstance } from 'axios';
import { StudentLog, StudentReg, TeacherLog, TeacherReg } from '../types/types';

export abstract class HttpBase {
  fetchingService: AxiosInstance;
  fetchingServiceWithHeaders: AxiosInstance;
  baseUrl: string;
  // TODO FIX HARDCODED URL
  constructor(baseUrl = 'http://localhost:3001') {
    this.baseUrl = baseUrl!;
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
    console.log(this.baseUrl);
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
    console.log(this.getFullApiUrl(registerTeacherApi));

    return await this.fetchingServiceWithHeaders.post(
      this.getFullApiUrl(registerTeacherApi),
      teacher
    );
  }
}
