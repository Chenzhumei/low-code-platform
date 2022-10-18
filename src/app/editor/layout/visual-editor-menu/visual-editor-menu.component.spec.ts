import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEditorMenuComponent } from './visual-editor-menu.component';

describe('VisualEditorMenuComponent', () => {
  let component: VisualEditorMenuComponent;
  let fixture: ComponentFixture<VisualEditorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualEditorMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualEditorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
