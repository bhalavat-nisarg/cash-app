import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
class NavbarStubComponent {}

@Component({
  selector: 'app-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
class TableStubComponent {}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, NavbarStubComponent, TableStubComponent],
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  }));

  it('creates the app with its existing title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('cash-app');
  });

  it('renders navigation and transactions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('app-navbar')).not.toBeNull();
    expect(root.querySelector('app-table')).not.toBeNull();
  });
});
