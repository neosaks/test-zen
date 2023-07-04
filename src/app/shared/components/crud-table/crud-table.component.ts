import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, of, from, fromEvent, Subject } from 'rxjs';
import { catchError, map, tap, startWith, switchMap, filter, mergeAll, last, takeUntil, debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IHttpOptions } from '@http/interfaces/http-options.interface';
import { ConfirmDialogComponent, IConfirmDialogConfig } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';

export interface ICrudTableColumns<T = any> {
  name: string;
  label: string;
  width?: string;
  format?: (value: string, row?: T) => string;
}

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент табличного представления записей */
export class CrudTableComponent<T> implements AfterViewInit, OnDestroy {
  @Input()
  getEntries?: (options: IHttpOptions) => Observable<HttpResponse<T[]>>;

  @Input()
  getEntry?: (id: number) => Observable<T>;

  @Input()
  createEntry?: (entry: T) => Observable<T>;

  @Input()
  updateEntry?: (entry: T) => Observable<T>;

  @Input()
  deleteEntry?: (entry: T) => Observable<void>;

  @Input()
  dataSource = new MatTableDataSource<T>([]);

  @Input()
  set displayedColumns(columns: string[]) {
    this._displayedColumns = ['@select', ...columns, '@actions'];
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  @Input()
  columns: ICrudTableColumns<T>[] = [];

  @Input()
  heightOffset: number = 80; // @todo, must equal to 0;

  @Output()
  readonly create = new EventEmitter<void>();

  // @Output()
  // readonly created = new EventEmitter<T>();

  @Output()
  readonly update = new EventEmitter<T>();

  // @Output()
  // readonly updated = new EventEmitter<T>();

  @Output()
  readonly delete = new EventEmitter<T | T[]>();

  // @Output()
  // readonly deleted = new EventEmitter<T>();

  @Output()
  readonly refreshed = new EventEmitter<T[]>();

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('tableContainer')
  protected _tableContainerRef!: ElementRef<HTMLDivElement>;

  get totalCount(): number | undefined {
    return this._totalCount;
  }

  get pageCount(): number | undefined {
    return this._pageCount;
  }

  get currentPage(): number | undefined {
    return this._currentPage;
  }

  get perPage(): number | undefined {
    return this._perPage;
  }

  get sortParam(): string | undefined {
    return this._sortParam;
  }

  get pageIndex(): number {
    return this.currentPage ? this.currentPage - 1 : 0;
  }

  get pageSizeOptions(): Array<number> {
    return [10, 20, 50];
  }

  readonly _selection = new SelectionModel<T>(true, []);

  get title(): string {
    return this._title.getTitle();
  }

  private _totalCount?: number;
  private _pageCount?: number;
  private _currentPage?: number;
  private _perPage?: number;
  private _sortParam?: string;
  private _displayedColumns: string[] = [];

  private _destroy$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _title: Title,
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this._resizeTableContainer(), 1000);

    fromEvent(window, 'resize')
      .pipe(debounceTime(1500), takeUntil(this._destroy$))
      .subscribe(() => this._resizeTableContainer());

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._getEntries(this.paginator, this.sort)
            .pipe(catchError(() => of(null)));
        }),
        map((data: T[] | null): T[] => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          return data;
        }),
      )
      .subscribe((data) => {
        if (this.displayedColumns.length === 0) { 
          const displayedColumns: string[] = [];

          this.columns.forEach((column) => {
            displayedColumns.push(column.name);
          });

          this.displayedColumns = displayedColumns;
        }

        this.dataSource.data = data;
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  refresh(message?: string): void {
    this._refresh(message);
  }

  protected _getEntries(paginator?: MatPaginator, sort?: MatSort): Observable<T[]> {
    if (!this.getEntries) {
      throw new Error('"getEntries" function not specified');
    }

    const httpParams: Record<string, string | number> = {};

    if (paginator) {
      if (this.currentPage) {
        httpParams['page'] = paginator.pageIndex + 1;
      }

      if (this.perPage) {
        httpParams['per-page'] = paginator.pageSize;
      }
    } else {
      if (this.currentPage) {
        httpParams['page'] = this.currentPage;
      }

      if (this.perPage) {
        httpParams['per-page'] = this.perPage;
      }
    }

    if (sort?.active) {
      this._sortParam = (sort.direction === 'asc') ? sort.active : '-' + sort.active;
      httpParams['sort'] = this.sortParam!;
    } else if (this.sortParam === null) { // @todo @debug
      delete httpParams['sort'];
    } else if (this.sortParam) {
      httpParams['sort'] = this.sortParam;
    }

    const options: IHttpOptions = {
      params: httpParams,
      observe: 'response',
    };

    return this.getEntries(options)
      .pipe(
        switchMap((response) => {
          this._totalCount = Number(response.headers.get('X-Pagination-Total-Count'));
          this._pageCount = Number(response.headers.get('X-Pagination-Page-Count'));
          this._currentPage = Number(response.headers.get('X-Pagination-Current-Page'));
          this._perPage = Number(response.headers.get('X-Pagination-Per-Page'));

          return of(response.body || []);
        }),
        tap((entries: T[]) => {
          this._selection.clear();
          this.dataSource.data = entries;
        }));
  }

  protected _create(): void {
    if (!this.createEntry) {
      this.create.emit();
    } else {
      throw new Error('The built-in processing mechanism is not implemented in this version');
    }

  }

  protected _update(entry: T): void {
    if (!this.updateEntry) {
      this.update.emit(entry);
    } else {
      throw new Error('The built-in processing mechanism is not implemented in this version');
    }
  }

  protected _delete(entryOrEntries: T | T[]): void {
    const deleteEntry = this.deleteEntry;

    if (deleteEntry) {
      const selectedLength = this._selection.selected.length;
      const message = Array.isArray(entryOrEntries)
        ? `Будет удалено ${selectedLength} записи(ей) из базы данных. Продолжить?`
        : `Будет удалена 1 запись из базы данных. Продолжить?`;
      const dialogConfig: IConfirmDialogConfig = { message };

      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: dialogConfig,
      });

      if (Array.isArray(entryOrEntries)) {
        const entries: T[] = entryOrEntries;
        const requests$ = from(entries.map((entry) => deleteEntry(entry)))
          .pipe(mergeAll(5));

        dialogRef.afterClosed()
          .pipe(
            filter((result) => result),
            switchMap(() => requests$),
            last(),
          )
          .subscribe(() => {
            this.refresh();
            const selectedLength = this._selection.selected.length;
            const message = `Удалено ${selectedLength} объектов`;
            this._snackBar.open(message, 'ОК', { duration: 4000 });
          });
      } else if ((this._isObject(entryOrEntries))) {
        const entry: T = entryOrEntries;

        dialogRef.afterClosed()
          .pipe(
            filter((result) => result),
            switchMap(() => deleteEntry(entry)))
          .subscribe(() => {
            this.refresh();
          });
      } 
    } else {
      this.delete.emit(entryOrEntries);
    }
  }

  protected _refresh(message?: string): void {
    this._getEntries().subscribe((entries) => {
      this._selection.clear();
      this.refreshed.emit(entries);

      if (!message) {
        return;
      }

      this._snackBar.open(message, 'ОК', {
        duration: 4000
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  protected _isAllSelected() {
    const numSelected = this._selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  protected _toggleAllRows() {
    if (this._isAllSelected()) {
      this._selection.clear();
      return;
    }

    this._selection.select(...this.dataSource.data);
  }

  protected _select(row: T): void {
    this._selection.clear();
    this._selection.select(row);
  }

  private _resizeTableContainer(): void {
    const tableContainer = this._tableContainerRef.nativeElement;
    const boundingClientRect = tableContainer.getBoundingClientRect();
    const height = window.innerHeight - (boundingClientRect.top + this.heightOffset);

    tableContainer.style.minHeight = height + 'px';
    tableContainer.style.maxHeight = height + 'px';

    this._cdr.detectChanges();
  }

  private _isObject(data: any): data is T {
    return typeof data === 'object';
  }
}
