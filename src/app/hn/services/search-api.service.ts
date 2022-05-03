import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';
import { QueryResult } from 'src/app/hn/interfaces/query-result';
import { Hit } from 'src/app/hn/interfaces/hit';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  constructor(private http: HttpClient) { }

  getQueryResult(keyword: string, page: number = 0): Observable<QueryResult> {
    // https://hn.algolia.com/api/v1/search?query=today
    // https://hn.algolia.com/api/v1/search?query=today&page=2
    const url = `https://hn.algolia.com/api/v1/search?query=${keyword}&page=${page}`;
    return this.http.get<QueryResult>(url).pipe(
      tap(res => {
        // console.log((res as any)?.query);
      }),
      map(res => {
        const queryResult: QueryResult = this.parseQueryResult(res);
        const hits: Hit[] = this.getHits((res as any)?.hits);
        queryResult.hits = hits;
        return queryResult;
      }),
      catchError(error => {
        // throw new Error(error)
        console.error('(SearchApiService) query not found');
        return of({ query: '(query not found)', nbHits: -1, hits: [] } as QueryResult);
      })
    )
  }

  private parseQueryResult(obj: any): QueryResult {
    const queryResult: QueryResult = {
      query: obj.query,
      nbHits: obj.nbHits,
      hits: [],
    };
    return queryResult;
  }

  private getHits(arr: any): Hit[] {
    let hits: Hit[] = [];
    arr.forEach((item: any) => {
      if (item !== undefined && item.created_at_i !== undefined) {
        const obj: Hit = {
          title: item.title,
          url: item.url,
          points: item.points,
          created_at_i: item.created_at_i,
        }
        // hits = [...hits, obj];
        hits.push(obj);
      }
    });
    return hits;
  }

}
