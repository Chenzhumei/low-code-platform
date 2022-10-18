import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDrawComponent } from './drag-draw.component';

describe('DragDrawComponent', () => {
  let component: DragDrawComponent;
  let fixture: ComponentFixture<DragDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
