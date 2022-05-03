import { Hit } from "./hit";

export interface QueryResult {
  query: string;
  hits: Hit[];
}
