export interface ProjectModel {
  id: number;
  name: string;
  description: string;
  manager: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  chiefEditor: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  extraChiefEditors: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  }[];
  targetDate: string;
  createdAt: string;
  updatedAt: string;
}
