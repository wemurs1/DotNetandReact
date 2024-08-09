export interface ChatComment {
  id: number;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}

export interface CreateComment {
  activityId?: string;
  body: string;
}
