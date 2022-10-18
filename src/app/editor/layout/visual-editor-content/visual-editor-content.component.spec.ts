import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEditorContentComponent } from './visual-editor-content.component';

describe('VisualEditorContentComponent', () => {
  let component: VisualEditorContentComponent;
  let fixture: ComponentFixture<VisualEditorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualEditorContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualEditorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
