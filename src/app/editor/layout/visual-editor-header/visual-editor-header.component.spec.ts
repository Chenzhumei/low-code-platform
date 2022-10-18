import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEditorHeaderComponent } from './visual-editor-header.component';

describe('VisualEditorHeaderComponent', () => {
  let component: VisualEditorHeaderComponent;
  let fixture: ComponentFixture<VisualEditorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualEditorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualEditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
