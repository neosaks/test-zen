import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable, Subject, debounceTime, startWith, switchMap, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAutocompleteComponent<T> implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  set searchFn(searchFn: ((search: string, control: FormControl<any>) => Observable<T[]>)) {
    this._searchFn = searchFn;
  }

  @Input()
  set displayFn(displayFn: (model: T) => string | number) {
    this._displayFn = (model: T): string => {
      const result = displayFn(model);

      if (typeof result === 'number') {
        return result.toString();
      }

      return result;
    };
  }

  @Input()
  set valueFn(valueFn: (model: T) => string | number) {
    this._valueFn = valueFn;
  }

  @Input()
  set initial(initial: (id: number) => Observable<any>) {
    this._initial = initial;
  }

  @Input()
  set field(formControlName: string) {
    this._field = formControlName;
  }

  @Input()
  set label(label: string) {
    this._label = label;
  }

  @Input()
  set hint(hint: string) {
    this._hint = hint;
  }

  protected _searchFn!: (search: string, control: FormControl<any>) => Observable<T[]>;
  protected _displayFn!: (value: T) => string;
  protected _valueFn!: (value: T) => string | number;
  protected _initial?: (id: number) => Observable<any>;
  protected _field!: string;
  protected _label!: string;
  protected _hint?: string;

  protected _formControl!: FormControl;
  protected _filteredOptions!: Observable<T[]>;

  private _destroy$ = new Subject<void>;

  constructor(
    private _formGroupDirective: FormGroupDirective,
  ) {}

  ngOnInit(): void {
    if (!this._searchFn) {
      throw new Error('Input property "searchFn" not specified');
    }

    if (!this._displayFn) {
      throw new Error('Input property "displayFn" not specified');
    }

    if (!this._valueFn) {
      throw new Error('Input property "valueFn" not specified');
    }

    if (!this._field) {
      throw new Error('Input property "field" not specified');
    }

    if (!this._label) {
      throw new Error('Input property "label" not specified');
    }

    const formGroup = this._formGroupDirective.form;
    const formControl = formGroup.get<any>(this._field);

    if (!(formControl instanceof FormControl)) {
      throw new Error('The "control" property must be a subclass of "FormControl"');
    }

    this._formControl = formControl;

    const filteredOptions$ = this._formControl.value
      ? this._formControl.valueChanges
      : this._formControl.valueChanges.pipe(startWith(''));

    this._filteredOptions = filteredOptions$.pipe(
      filter((search) => typeof search === 'string'),
      debounceTime(1000),
      switchMap((search: string) => this._searchFn(search, formControl)),
      takeUntil(this._destroy$),
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    if (this._formControl.value && this._initial) {
      this._initial(this._formControl.value).subscribe((search) => {
        this._selected(search);
      });
    }
  }

  protected _selected(model: T): void {
    this._formControl.setValue(this._displayFn(model), {
      onlySelf: true,
      emitEvent: false,
      emitViewToModelChange: false,
      emitModelToViewChange: true,
    });

    this._formControl.setValue(this._valueFn(model), {
      emitModelToViewChange: false,
    });
  }
}
