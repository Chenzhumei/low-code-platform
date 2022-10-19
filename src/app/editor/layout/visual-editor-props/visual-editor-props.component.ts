import { Component, Input, OnInit } from '@angular/core';
import { SchemaService } from '../../service/schema.service';
import * as _ from 'lodash';
import { EditorService } from '../../service/editor.service';

@Component({
  selector: 'app-visual-editor-props',
  templateUrl: './visual-editor-props.component.html',
  styleUrls: ['./visual-editor-props.component.scss']
})
export class VisualEditorPropsComponent implements OnInit {
  public currentBlock: any = null;
  public editProps: any = {};
  private beforeBlock:any = null;
  public blockIndex: number  = -1;
  public currentContainer: any = {width: 800, height: 1000};
  public beforeContainer: any = null;
  constructor(
    public schemaService: SchemaService,
    private editorService: EditorService,
  ) { }

  ngOnInit(): void {
    this.currentContainer = _.cloneDeep(this.schemaService.schema.container);
    this.beforeContainer = _.cloneDeep(this.schemaService.schema.container);

    this.schemaService.lateastSelectedBlock$.subscribe((blockInfo: any) => {
      this.currentBlock = _.cloneDeep(blockInfo.lateastSelectedBlock);
      // 保留一份原始数据
      this.beforeBlock = _.cloneDeep(blockInfo.lateastSelectedBlock);
      this.blockIndex = blockInfo.blockIndex;
      this.editProps = blockInfo.lateastSelectedBlock ? _.cloneDeep(blockInfo.lateastSelectedBlock.props) : {}
    })
  }

  get propKeys() {
    return this.currentBlock ? Object.keys(this.currentBlock.propsConfig) : [];
  }

  reset() {
    if (this.currentBlock) {
      this.currentBlock = _.cloneDeep(this.beforeBlock);
    } else {
      this.currentContainer = _.cloneDeep(this.beforeContainer);
    } 
  }

  apply() {
    if (this.currentBlock) {
      this.schemaService.updatePropsByBlockIndex(this.blockIndex, this.editProps);
    } else {
      this.schemaService.updateContainer(this.currentContainer);
    } 
  }

}
