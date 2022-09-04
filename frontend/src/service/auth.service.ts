import { StudentLog, StudentReg, TeacherLog, TeacherReg } from '../types/types';
import { HttpBase } from './http.service';

class AuthService extends HttpBase {
  registerStudentApi = '/auth/registerStudent';
  registerTeacherApi = '/auth/registerTeacher';
  loginTeacherApi = '/auth/loginTeacher';
  loginStudentApi = '/auth/loginTeacher';

  async loginTeacher(teacher: TeacherLog) {
    return await this.logTeacher(this.loginTeacherApi, teacher);
  }
  async loginStudent(student: StudentLog) {
    return await this.logStudent(this.loginStudentApi, student);
  }
  async registerStudent(student: StudentReg) {
    return await this.regStudent(this.registerStudentApi, student);
  }
  async registerTeacher(teacher: TeacherReg) {
    return await this.regTeacher(this.registerTeacherApi, teacher);
  }
}
const authApi = new AuthService();
export default authApi;
