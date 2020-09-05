export interface MigrateMessage {
  hostUrl: string;
  sourceToken: string;
  targetToken: string;
  waitTime: number;
  csvFile: File;
}
