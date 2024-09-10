import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fetchDataFromApi } from '../services/apiServices';
import { API_DOMAIN } from '../constants/ApiConstants';

interface Grade {
  id: string;
  subject: string;
  grade: string;
  code?: string;
}

interface AttendanceSubjectEntry {
  id: string;
  subject: string;
  grade: string;
  code?: string;
}

interface Post {
  id: string;
  accountName: string;
  accountIcon: string;
  postDate: string;
  caption: string;
  photos: string[];
}

interface ApiDataContextType {
  data: any[];
  loading: boolean;
  error: string | null;
  grades: Grade[];
  examTypes: any[];
  refetchData: () => void;
  posts: Post[];
  studentName: string;
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [examTypes, setExamTypes] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [attendanceRecord, setAttendanceRecord] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [attendanceSubject, setAttendanceSubject] = useState<AttendanceSubjectEntry[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [attendanceToday, setAttendanceToday] = useState<any[]>([]);
  const [studentName, setStudentName] = useState<any[]>([]);
  const [studentClass, setStudentClass] = useState<any[]>([]);
  const [busTiming, setBusTiming] = useState<any[]>([]);
  const [schoolName, setSchoolName] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [schoolAccountDetails, setSchoolAccountDetails] = useState<any[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const refetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDataFromApi(`${API_DOMAIN}/api/data/test/testid`);
      const fetchedData = JSON.parse(JSON.stringify(response));
      setData(fetchedData);
      setGrades(fetchedData.grades);
      setExamTypes(fetchedData.examTypes);
      setAttendanceSubject(fetchedData.attendanceSubjectWise);
      setAttendance(fetchedData.attendance)
      setAttendanceRecord(fetchedData.attendanceRecord.records)
      setTests(fetchedData.tests)
      setClubs(fetchedData.clubs)
      setQuizzes(fetchedData.quiz)
      setTimetable(fetchedData.timetable)
      setAssignments(fetchedData.assignments)
      setAttendanceToday(fetchedData.attendanceToday);
      setStudentName(fetchedData.studentName);
      setStudentClass(fetchedData.studentClass);
      setBusTiming(fetchedData.busTiming);
      setSchoolName(fetchedData.schoolName);
      setFees(fetchedData.fees);
      setAnnouncements(fetchedData.announcements);
      setSchoolAccountDetails(fetchedData.schoolAccountDetails);
      setPosts(fetchedData.posts);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={{ 
      data, 
      loading, 
      error, 
      grades, 
      examTypes, 
      attendance, 
      clubs, 
      attendanceRecord, 
      schoolAccountDetails, 
      announcements, 
      fees, 
      studentName, 
      studentClass, 
      schoolName, 
      attendanceToday, 
      busTiming, 
      quizzes, 
      timetable, 
      assignments, 
      attendanceSubject, 
      tests, 
      refetchData, 
      posts 
    }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error('useApiData must be used within an ApiDataProvider');
  }
  return context;
};
