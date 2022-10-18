import { Injectable } from '@angular/core';
import { EditorService } from './editor.service';

@Injectable()
export class SchemaService {
  public schema: Record<string, any> = {
    container: {
      width: '1000px',
      height: '1000px'
    },
    blocks: []
  };

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
}
