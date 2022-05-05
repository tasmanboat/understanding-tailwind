import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Theme } from 'src/app/hn/interfaces/theme';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>({} as Theme);
  constructor(private pss: PersistentStorageService) {
    this.init();
  }

  updateTheme(flag: boolean) {
    const isLightMode = !flag;
    const theme: Theme = isLightMode ? { theme: 'light', bgColor1: 'bg-slate-200', bgColor2: 'bg-white' } : { theme: 'dark', bgColor1: 'bg-slate-400', bgColor2: 'bg-slate-300' };
    this.theme$.next(theme);
    this.performSideEffect();
  }

  getTheme(): Observable<Theme> {
    return this.theme$.asObservable();
  }

  private performSideEffect(): void {
    // side effect
    this.getTheme().pipe(first()).subscribe(data => {
      this.pss.setItemAsync("hn-search-theme", JSON.stringify(data)); // not block
    })
  }

// #region load data from local storage
  private async init() {
    // await this.pss.removeItemAsync("hn-search-theme");
    const data = await this.pss.getItemAsync("hn-search-theme") as string | null;
    if (data) {
      const theme: Theme = JSON.parse(data);
      this.theme$.next(theme);
    } else {
      const theme: Theme = { theme: 'dark', bgColor1: 'bg-slate-400', bgColor2: 'bg-slate-300' };
      this.theme$.next(theme);
    }
  }
// #endregion

}
