import { Component, Input, OnInit } from '@angular/core';
import { SchemaService } from '../../service/schema.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-visual-editor-props',
  templateUrl: './visual-editor-props.component.html',
  styleUrls: ['./visual-editor-props.component.scss']
})
export class VisualEditorPropsComponent implements OnInit {
  public currentBlock: any = null;
  public editProps: any = {};
  public currentContainer: any = {width: 800, height: 1000};
  constructor(
    public schemaService: SchemaService
  ) { }

  ngOnInit(): void {
    this.currentContainer = _.cloneDeep(this.schemaService.schema.container);
    this.schemaService.lateastSelectedBlock$.subscribe((block: any) => {
      console.log('latest block:', block)
      this.currentBlock = _.cloneDeep(block)
      this.editProps = block ? _.cloneDeep(block.props) : {}
    })
  }

  get propKeys() {
    return this.currentBlock ? Object.keys(this.currentBlock.propsConfig) : [];
  }

}
