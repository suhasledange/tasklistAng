import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoteformComponent } from './addnoteform.component';

describe('AddnoteformComponent', () => {
  let component: AddnoteformComponent;
  let fixture: ComponentFixture<AddnoteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnoteformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnoteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
