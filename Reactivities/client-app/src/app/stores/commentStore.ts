import { makeAutoObservable } from "mobx";
import { ChatComment } from "../models/comment";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      const token = store.userStore.user?.token;
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?activityId=" + activityId, {
          accessTokenFactory: () => token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    }
  };
}
