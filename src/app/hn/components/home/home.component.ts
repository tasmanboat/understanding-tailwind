import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchHistoryService } from '../../services/search-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private searchHistoryService: SearchHistoryService,
  ) { }

  ngOnInit(): void {
    console.log(`(HomeComponent) ngOnInit`);
  }

// #region handle search bar event, open the first page of query result
  onSearched(keyword: string) {
    if (keyword && keyword.trim()) {
      this.searchHistoryService.addSearchHistory(keyword.trim());
      this.router.navigate(['search'], { queryParams: { keyword: keyword.trim() }});
    } else {
      console.log(`(HomeComponent) nothing to do`)
    }
  }
// #endregion

}
