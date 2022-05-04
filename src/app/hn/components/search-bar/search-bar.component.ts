import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, first, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HistoryItem } from "src/app/hn/interfaces/history-item";
import { SearchHistoryService } from '../../services/search-history.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searched: EventEmitter<string> = new EventEmitter<string>();
  @Input() keyword: string = '';
  constructor(private service: SearchHistoryService) { }

  ngOnInit(): void {
  }

// #region autocomplete dropdown panel and func (an autocomplete control)
/*
no event handler eh is needed
provide data for the `html input list datalist`
*/
searchHistory$: Observable<HistoryItem[]> = this.service.getSearchHistory();
// #endregion

}
