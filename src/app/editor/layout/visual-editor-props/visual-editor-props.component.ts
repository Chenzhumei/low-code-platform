import { Component, Input, OnInit } from '@angular/core';
import { SchemaService } from '../../service/schema.service';

@Component({
  selector: 'app-visual-editor-props',
  templateUrl: './visual-editor-props.component.html',
  styleUrls: ['./visual-editor-props.component.scss']
})
export class VisualEditorPropsComponent implements OnInit {
  public currentBlock: any;
  constructor(
    public schemaService: SchemaService,
  ) { }

  ngOnInit(): void {
    this.schemaService.lateastSelectedBlock$.subscribe((block: any) => {
      console.log('latest block:', block)
    })
  }

}
