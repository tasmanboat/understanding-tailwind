import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchApiService } from '../../services/search-api.service';
import { QueryResult } from '../../interfaces/query-result';
import { Hit } from '../../interfaces/hit';

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
  ) { }

// #region handle search bar event, open the first page of query result
  onSearched(keyword: string) {
    if (keyword && keyword.trim()) {
      this.keyword = keyword;
      this.searchHistoryService.addSearchHistory(keyword.trim());
      this.queryResult$ = this.searchApiService.getQueryResult(keyword.trim());
      this.router.navigate(['search'], { queryParams: { keyword: keyword.trim() }});
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
    this.queryResult$ = this.searchApiService.getQueryResult(this.keyword.trim());
    console.log(`(SearchComponent) ngOnInit`);
  }
  keyword: string = '';
// #endregion

// #region pagination
/*
write page data into route param
*/
  // page: number = 1;
  set page(page: number) {
    this._page = page;
    this.router.navigate(['search'], { queryParams: { keyword: this.keyword.trim(), page: this.page }});
  }
  get page(): number { return this._page }
  private _page: number = 1;
// #endregion

}
