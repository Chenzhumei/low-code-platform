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

  cleanBlocksFocus(blockIndex: number, isFocus?: boolean) {
    const {focus} = this.blocksFocusInfo();
    // 如果点击画布且画布中没有focus的组件，直接return，避免更新
    if (blockIndex == -1 && !focus.length) return;
    this.schema.blocks = this.schema.blocks.map((block: any, index: number) => {
      if (blockIndex == index) {
        block.focus = isFocus;
      } else {
        block.focus = false;
      } 
      return block;
    });
    // this.schema.blocks = _.cloneDeep(blocks)
  } 

  setLateastSelectedBlock(selectedBlockInfo:{lateastSelectedBlock: any, blockIndex: number}) {
   this.lateastSelectedBlock$.next(selectedBlockInfo);
  }
}
