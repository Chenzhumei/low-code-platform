import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { KeyboardCode } from '../constant/key-code.constant';
import { DragEventService } from './drag-event.service';
import { SchemaService } from './schema.service';

interface ICommand {
  name: string,
  keyboard?: string | string[], // 键盘快捷键
  pushQueue: boolean, // command是否需要加入队列
  execute: () => ICommandExecute,
  init?: () => {} // 注册时初始化,
  data?: any; // 保存的数据，通常为redo，undo需要的数据
}

interface ICommandExecute {
  undo?: () => void,
  redo?: () => void,
  handle?: () => void
}

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  queue: any[] = []; // command 队列
  current = -1; // 当前 command 在队列中的位置
  commands: any = {}; // command 和处理函数 Map 映射表
  commandList: any[] = []; // command 集合
  // 注册的完整对象集合 [{name: 'xx', keywords: "", followQueue: false, execute: () => {redo, undo}}]
  commandDestoryList: any[] = []; // 需要被销毁的 command 集合（存在 init 方法的 command 需要被销毁）

  constructor(
    private schemaService: SchemaService,
    private dragEventService: DragEventService
  ) { }

  // 注册命令函数
  private register(command: ICommand) {
    // 命令池不存在当前命令
    if (this.commands[command.name]) return;
    // 向命令池注册命令
    this.commandList.push(command);
    // 该命令处理函数
    this.commands[command.name] = () => { 
      const execute = command.execute();
  
      execute.handle && execute.handle(); // 之所以使用 execute，目的是为了保留 this 指针
      // 当前命令不需要加入队列
      if (!command.pushQueue) return;

      // 每次向队列中加入任务时，根据当前操作的任务，重新计算队列
      // 如，在本次加入此任务前，已发生了撤销操作，即 this.current !== this.queue.length - 1
      if (this.queue.length > 0) {
        this.queue = this.queue.slice(0, this.current + 1);
      }
      const { redo, undo } = execute;
      this.queue.push({ redo, undo }); // 保存前进后退
      this.current = this.current + 1;
    }
  }

  // 键盘事件
  keyboardEvent() {
    // 键盘事件处理
    const onKeydown = (e: KeyboardEvent) => {
        // console.log(e);
        // 当前聚焦状态的Element不是document.body，则阻止
        if (document.activeElement !== document.body) return;
        const { keyCode, shiftKey, altKey, ctrlKey, metaKey } = e;
        // 复合键处理
        let keyString: string[] = [];
        if (ctrlKey || metaKey) keyString.push('ctrl');
        if (shiftKey) keyString.push('shift');
        if (altKey) keyString.push('alt');
        keyString.push(KeyboardCode[keyCode]);
        const keyNames = keyString.join('+');
        console.log('当前键盘', keyNames);

        // 找到注册的方法并执行
        this.commandList.forEach(({ keyboard, name }) => {
            if (!keyboard) return;
            const keys = Array.isArray(keyboard) ? keyboard : [keyboard];
            if (keys.indexOf(keyNames) > -1) {
                this.commands[name](); // 执行
                e.stopPropagation();
                e.preventDefault(); // 阻止默认行为，比如Ctrl+D会触发收藏，现在阻止了，只执行我们定义的
            }
        })

    }
    const init = () => {
        // 订阅键盘按下事件
        window.addEventListener('keydown', onKeydown);
        // 销毁键盘事件
        return () => window.removeEventListener('keydown', onKeydown);
    }
    return init();
}

  initCommands() {
    const _this = this;
    // 注册撤销
    this.register({
      name: 'undo',
      keyboard: 'ctrl+z',
      pushQueue: false,
      execute: () => {
        return {
          handle:() => {
            console.log('撤销');
            let item = this.queue[this.current];
            if (item) {
              item.undo && item.undo();
              this.current--;
            }
          }
        }
      }
    });

    // 注册重做 command
    this.register({
      name: 'redo',
      keyboard: ['ctrl+y', 'ctrl+shift+z'],
      pushQueue: false,
      execute: () => {
        return {
          handle: () => {
            console.log('重做');
            let item = this.queue[this.current + 1];
            if (item) {
              item.redo && item.redo();
              this.current++;
            }
          }
        }
      }
  });

  // 注册拖拽
  this.register({
    name: 'drag',
    pushQueue: true,
    data: {},
    init() { // 初始化操作，注册时立即执行
      this.data.before = null; // 拖拽前保存 blocks 副本
      _this.dragEventService.startDrag$.subscribe((res: any) => {
        console.log(res)
        this.data.before = _.cloneDeep(_this.schemaService.schema.blocks); // 避免地址引用
      });
      _this.dragEventService.endDrag$.subscribe((res: any) => {
        console.log(res)
        _this.commands.drag(); // 其实就是redo，并且将拖拽redo audo保存一份到数组queue中，用于撤销操作
      });
      return () => {
        console.log('拖拽-销毁订阅');
        _this.dragEventService.startDrag$.unsubscribe();
        _this.dragEventService.endDrag$.unsubscribe();
      }
    },
    execute(){
      let before = this.data.before;
      let after = _.cloneDeep(_this.schemaService.schema.blocks);
      return {
        undo() { // 撤销
          _this.schemaService.updateBlocks(before);
        },
        redo() { // 重做
          _this.schemaService.updateBlocks(after);
        },
      }
    }
  });

  // 注册删除
  this.register({
    name: 'delete',
    keyboard: [
        'backspace',
        'delete',
        'ctrl+d'
    ],
    pushQueue: true,
    execute() {
        console.log('执行删除命令');
        const before = _.cloneDeep(_this.schemaService.schema.blocks);
        // 将选中的都删除掉，剩余的就是未选中的
        const after = _this.schemaService.blocksFocusInfo().unfocused;
        return {
            undo: () => {
                console.log('撤回删除命令');
                _this.schemaService.updateBlocks(before);
            },
            redo: () => {
                console.log('redo删除命令');
                _this.schemaService.updateBlocks(after);
            },
            handle: () => {
              _this.schemaService.updateBlocks(after); // 进行删除，删除画布中选中的元素
            },
        }
    }
  });

  // 注册置顶
  this.register({
    name: 'placeTop',
    keyboard: 'ctrl+up',
    pushQueue: true,
    execute() {
        const before = _.cloneDeep(_this.schemaService.schema.blocks);
        const { focus, unfocused } = _this.schemaService.blocksFocusInfo();
        const maxZIndex = unfocused.reduce((prev, block) => Math.max(prev, block.zIndex), 0) + 1;
        // 给选中元素增加权重
        focus.forEach(block => block.zIndex = maxZIndex);
        const after = _.cloneDeep(_this.schemaService.schema.blocks);
        return {
            undo: () => {
                console.log('undo撤回置顶命令', before);
                _this.schemaService.updateBlocks(before);
            },
            redo: () => {
                console.log('redo置顶命令', after);
                _this.schemaService.updateBlocks(after);
            },
            handle: () => {
              _this.schemaService.updateBlocks(after);
            },
        }
    }
  });

  // 注册置底
  this.register({
    name: 'placeBottom',
    keyboard: 'ctrl+down',
    pushQueue: true,
    execute() {
        const before = _.cloneDeep(_this.schemaService.schema.blocks);
        const { focus, unfocused } = _this.schemaService.blocksFocusInfo();
        let minZIndex = unfocused.reduce((prev, block) => Math.min(prev, block.zIndex), Infinity) - 1;
        if (minZIndex < 0) { // 小于0,就让他等于0（小于0不太好）
          const dur = Math.abs(minZIndex);
          unfocused.forEach(block => block.zIndex += dur);
          minZIndex = 0;
        }
        // 给选中元素增加权重
        focus.forEach(block => block.zIndex = minZIndex);
        const after = _.cloneDeep(_this.schemaService.schema.blocks);
        return {
            undo: () => {
                console.log('undo撤回置底命令');
                _this.schemaService.updateBlocks(before);
            },
            redo: () => {
                console.log('redo置底命令');
                _this.schemaService.updateBlocks(after);
            },
            handle: () => {
              _this.schemaService.updateBlocks(after);
            },
        }
    }
   });

   // 注册清空
   this.register({
    name: 'clear',
    pushQueue: true,
    execute() {
     const before = _.cloneDeep(_this.schemaService.schema.blocks), after: any[] = [];
        return {
            undo: () => {
                console.log('undo撤回清空命令');
                _this.schemaService.updateBlocks(before);
            },
            redo: () => {
                console.log('redo清空命令');
                _this.schemaService.updateBlocks(after);
            },
            handle: () => {
              _this.schemaService.updateBlocks(after);
            },
        }
    }
  })

  // 调用注册对象的init方法
  this.commandList.forEach(command => command.init && this.commandDestoryList.push(command.init()));
  // 初始化键盘事件，添加移除事件
  this.commandDestoryList.push(this.keyboardEvent());
  console.log('注册命令：', this.commands)
  console.log('需要注销：', this.commandDestoryList)
  }

  destroy() {
    this.commandDestoryList.forEach(fn => !!fn && fn());
  }
}
