import {} from '../types/types';
import HttpBase from './http.service';

class StudentService extends HttpBase {
  studentsApi = '/students/';

  getSpecificStudent(id: string, email?: string | undefined) {
    return this.getStudent(this.studentsApi, id, email);
  }
}
const studentsApi = new StudentService();
export default studentsApi;
