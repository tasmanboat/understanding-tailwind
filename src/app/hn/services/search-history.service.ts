import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, first, delay } from 'rxjs/operators';
import { HistoryItem } from 'src/app/hn/interfaces/history-item';
import { SEARCH_HISTORY } from 'src/app/hn/services/mock-search-history';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private searchHistory: HistoryItem[] = SEARCH_HISTORY;
  private searchHistory$: BehaviorSubject<HistoryItem[]> = new BehaviorSubject<HistoryItem[]>(this.searchHistory);
  constructor(private pss: PersistentStorageService) {
    this.init();
  }

  addSearchHistory(keyword: string): void {
    const keywords = this.searchHistory.map(i => i.keyword);
    if (!keywords.includes(keyword)) {
      const id = Math.max(...this.searchHistory.map(i => i.id)) + 1;
      this.searchHistory.push({ id, keyword } as HistoryItem);
      this.performSideEffect();
    }
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
      this.pss.setItemAsync("hn-search-history", JSON.stringify(data)); // not block
    })
  }

// #region load data from local storage
  private async init() {
    //// await this.pss.removeItemAsync("hn-search-history");
    this.searchHistory$.next([]);
    const data = await this.pss.getItemAsync("hn-search-history") as string | null;
    this.searchHistory = data ? JSON.parse(data) : [];
    // this.searchHistory = (data && JSON.parse(data)?.length > 0) ? JSON.parse(data) : SEARCH_HISTORY;
    this.searchHistory$.next(this.searchHistory);
    this.performSideEffect();
  }
// #endregion

}
