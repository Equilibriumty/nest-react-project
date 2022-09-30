import HttpBase from './http.service';

class TeachersService extends HttpBase {
  teachersApi = '/teachers/';

  async getSpecificTeacher(id: string, email?: string | undefined) {
    return this.getTeacher(this.teachersApi, id, email);
  }
}
const teachersApi = new TeachersService();
export default teachersApi;
