import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EditorService } from './editor.service';
import * as _ from 'lodash'

@Injectable()
export class SchemaService {
  public schema: Record<string, any> = {
    container: {
      width: 800,
      height: 1000
    },
    blocks: []
  };

  public lateastSelectedBlock$ = new Subject<any>();

  constructor(
    private editorService:EditorService,
  ) { 
    if (sessionStorage.getItem('myschema')) {
      this.schema = JSON.parse(sessionStorage.getItem('myschema') as string)
    }
  }

  updateBlocks(blocks: any[]) {
    this.schema.blocks = blocks;
  }

  updatePropsByBlockIndex(index: number, newProps: any) {
    const findBlock =this.schema.blocks[index];
    if (findBlock) {
      findBlock.props = newProps;
      this.editorService.forceUpdateEditor(index)
    }
  }

  updateContainer(newContainer: any) {
    this.schema.container = newContainer;
  }



  resetSchema() {
    this.schema = {
      container: {
        width: '1000px',
        height: '1000px'
      },
      blocks: []
    };
  }

  blocksFocusInfo(){
    let focus:any[] = [], unfocused:any[] = [];
    this.schema.blocks.forEach((block: any) => (block.focus ? focus : unfocused).push(block));
    return { focus, unfocused };
  }

  cleanBlocksFocus(refresh: boolean) {
    this.schema.blocks.forEach((block: any) => block.focus = false);
    // refresh && this.editorService.forceUpdateEditor(true);
  } 

  setLateastSelectedBlock(selectedBlockInfo:{lateastSelectedBlock: any, blockIndex: number}) {
   this.lateastSelectedBlock$.next(selectedBlockInfo);
  }
}
