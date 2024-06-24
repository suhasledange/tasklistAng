import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogTableComponent } from './sales-log-table.component';

describe('SalesLogTableComponent', () => {
  let component: SalesLogTableComponent;
  let fixture: ComponentFixture<SalesLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesLogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
