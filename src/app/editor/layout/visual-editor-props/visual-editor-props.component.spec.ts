import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualEditorPropsComponent } from './visual-editor-props.component';

describe('VisualEditorPropsComponent', () => {
  let component: VisualEditorPropsComponent;
  let fixture: ComponentFixture<VisualEditorPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualEditorPropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualEditorPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
