export interface IUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;

  role: string;
  createdAt: string;
  stats: IUserStats;
  completed: string[];
}

interface IUserStats {
  completedQuizzes: number;
  points: number;
}
