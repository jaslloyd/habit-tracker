interface HabitCompletionInfo {
  date: string;
  time: string;
}

export default interface Habit {
  _id: string;
  name: string;
  description: string;
  completed: number;
  last_updated: string;
  lastUpdated: HabitCompletionInfo[];
  year: string;
  month: string;
  category: string;
  target: number;
  endDate?: number;
}
