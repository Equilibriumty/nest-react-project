import { useQuery } from 'react-query';
import studentsApi from '../service/student.service';

export const useFetchStudent = (studentId: string, email?: string) => {
  const data = useQuery(['fetchStudent'], () =>
    studentsApi.getSpecificStudent(studentId, email)
  );
  return data;
};
