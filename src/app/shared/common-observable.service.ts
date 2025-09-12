import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonObservableService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new BehaviorSubject<string>('');

  getSearchObservable() {
    return this.searchSubject.asObservable();
  }

  nextSearch(value: string) {
    this.searchSubject.next(value);
  }

  get destroy() {
    return this.destroy$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
