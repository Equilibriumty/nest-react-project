import { useQuery } from 'react-query';
import teachersApi from '../service/teacher.service';

const useFetchTeacher = (teacherId: string, email?: string) => {
  const { data, error, isLoading } = useQuery(['fetchStudent'], () =>
    teachersApi.getSpecificTeacher(teacherId, email)
  );
  return { data, error, isLoading };
};
export default useFetchTeacher;
