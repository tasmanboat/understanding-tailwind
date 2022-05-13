import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { SearchApiService } from '../../services/search-api.service';
import { QueryResult } from '../../interfaces/query-result';
import { Hit } from '../../interfaces/hit';

import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../interfaces/theme';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchHistoryService } from '../../services/search-history.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  queryResult$?: Observable<QueryResult>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private searchApiService: SearchApiService,
    private searchHistoryService: SearchHistoryService,
    private themeService: ThemeService,
  ) { }

// #region handle search bar event, open the first page of query result
  onSearched(keyword: string) {
    if (keyword && keyword.trim()) {
      this.keyword = keyword;
      this.searchHistoryService.addSearchHistory(keyword.trim());
      // this.queryResult$ = this.searchApiService.getQueryResult(keyword.trim());
      this.queryResult$ = this.getQueryResult(this.keyword);
      this.router.navigate(["."], { relativeTo: this.route, queryParams: { keyword: keyword.trim() }});
      this.page = 1;
    } else {
      console.log(`(HomeComponent) nothing to do`)
    }
  }
// #endregion

// #region trackById
  trackById(index: number, hit: Hit): number {
    return hit.created_at_i;
  }
// #endregion

// #region load the component when page refreshes, handling route param
  ngOnInit(): void {
    this.keyword = this.route.snapshot.queryParamMap.get('keyword') ?? 'today';
    this.page = Number(this.route.snapshot.queryParamMap.get('page') ?? '1');
    // effect effects
    // effect1: to read the query param on any page
    // effect2: to add the query param to the first page

    // this.queryResult$ = this.searchApiService.getQueryResult(this.keyword.trim());
    this.queryResult$ = this.getQueryResult(this.keyword);
    console.log(`(SearchComponent) ngOnInit`);
  }
  keyword: string = '';
// #endregion

// #region pagination
/*
write page number into route param
*/
  // page: number = 1;
  set page(page: number) {
    this._page = page;
    this.router.navigate(["."], { relativeTo: this.route, queryParams: { keyword: this.keyword.trim(), page: this.page }});
  }
  get page(): number { return this._page }
  private _page: number = 1;
// #endregion

// #region sorting
// an event will trigger sorting of query result
  // private sorting: Sorting = 'pointDes';
  private sorting$: BehaviorSubject<Sorting> = new BehaviorSubject<Sorting>('pointDes');
  updateSorting(e: any) {
    // console.log((e.target as HTMLSelectElement)?.value);
    console.log(e.target.value);
    this.sorting$.next(e.target.value as Sorting);
  }
  private getQueryResult(keyword: string): Observable<QueryResult> {
    // this.queryResult$ = this.searchApiService.getQueryResult(keyword.trim());
    return this.sorting$.pipe(
      switchMap((sorting: Sorting) => {
        return this.searchApiService.getQueryResult(keyword.trim()).pipe(
          map((qr: QueryResult) => {
            console.log(`sorting ...`);
            switch(sorting) {
              // 'pointDes' | 'timeDes' | 'timeAsc' | 'pointAsc'
              case 'pointDes':
                qr.hits.sort((a,b) => b.points - a.points);
                break;
              case 'timeDes':
                qr.hits.sort((a,b) => b.created_at_i - a.created_at_i);
                break;
              case 'timeAsc':
                qr.hits.sort((a,b) => a.created_at_i - b.created_at_i);
                break;
              case 'pointAsc':
                qr.hits.sort((a,b) => a.points - b.points);
                break;
              default:
                break;
            }
            return qr;
          })
        )
      })
    );
  }
// #endregion

// #region clear search history
  clearSearchHistory() {
    if (window.confirm('Are you sure you want to clear search history?')) {
      this.searchHistoryService.clearSearchHistory();
    }
  }
// #endregion

// #region theme
  theme$: Observable<Theme> = this.themeService.getTheme();
  updateTheme(e: any) {
    this.themeService.updateTheme(e.currentTarget.checked);
    // this.theme$.pipe(first()).subscribe(data => console.log(data));
  }
// #endregion

}

type Sorting = 'pointDes' | 'timeDes' | 'timeAsc' | 'pointAsc';
