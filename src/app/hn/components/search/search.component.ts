import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchApiService } from '../../services/search-api.service';
import { QueryResult } from '../../interfaces/query-result';
import { Hit } from '../../interfaces/hit';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private service: SearchApiService,
  ) { }

// #region handle search bar event, open the first page of query result
  onSearched(keyword: string) {
    this.keyword = keyword;
    this.queryResult$ = this.service.getQueryResult(keyword, 0);
    this.router.navigate(['search'], { queryParams: { keyword: keyword }});
  }
// #endregion

// #region trackById
  trackById(index: number, hit: Hit): number {
    return hit.created_at_i;
  }
// #endregion

// #region load the component when page refreshes, handling route param
  ngOnInit(): void {
    const keyword = this.route.snapshot.queryParamMap.get('keyword') ?? 'today';
    const page = this.route.snapshot.queryParamMap.get('page') ?? '0';
    this.queryResult$ = this.service.getQueryResult(keyword, +page);
    this.keyword = keyword;
  }
  keyword: string = '';
// #endregion

}
