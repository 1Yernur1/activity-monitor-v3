import { ProfileModel } from "./ProfileModel";

export interface ActivityModel {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  language: string;
  targetLanguage: string;
  translator: ProfileModel;
  status: string;
  targetTitle: string;
  totalHoursCompleted: number;
  hoursRemaining: number;
  percentageCompleted: number;
  docxUploaded: boolean;
  createdAt: string;
  updatedAt: string;
}
