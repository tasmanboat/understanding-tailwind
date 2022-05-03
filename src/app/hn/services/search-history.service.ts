import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, first, delay } from 'rxjs/operators';
import { HistoryItem } from "src/app/hn/interfaces/history-item";
import { SEARCH_HISTORY } from "src/app/hn/services/mock-search-history";
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private searchHistory: HistoryItem[] = [];
  private searchHistory$: BehaviorSubject<HistoryItem[]> = new BehaviorSubject<HistoryItem[]>(this.searchHistory);
  constructor(private pss: PersistentStorageService) {
    this.searchHistory = SEARCH_HISTORY;
  }

  addSearchHistory(keyword: string): void {
    const id = Math.max(...this.searchHistory.map(i => i.id)) + 1;
    this.searchHistory.push({ id, keyword } as HistoryItem);
    this.performSideEffect();
  }

  clearSearchHistory(): void {
    this.searchHistory = [];
    this.searchHistory$.next(this.searchHistory);
    this.performSideEffect();
  }

  getSearchHistory(): Observable<HistoryItem[]> {
    return this.searchHistory$.asObservable();
  }

  private performSideEffect(): void {
    // side effect
    this.getSearchHistory().pipe(first()).subscribe(data => {
      this.pss.setItemAsync('hn-search-history', JSON.stringify(data)); // not block
    })
  }

}