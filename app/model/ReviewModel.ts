import { ProfileModel } from "./ProfileModel";

export interface ReviewModel {
  id: number;
  activityId: number;
  activityTitle: string;
  status: string;
  chiefEditor: ProfileModel;
  comment: string;
  remarkCount: number;
  createdAt: Date;
  endAt: Date;
}
