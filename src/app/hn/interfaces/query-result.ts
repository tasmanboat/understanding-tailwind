import { Hit } from "./hit";

export interface QueryResult {
  query: string;
  nbHits: number;
  hits: Hit[];
}
