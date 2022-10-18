import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { KeyboardCode } from '../constant/key-code.constant';
import { DragEventService } from './drag-event.service';
import { SchemaService } from './schema.service';

@Injectable()
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
  ) {
    this.init()
  }

  // 注册函数
  register(command: any) {
    // 保存注册的对象
    this.commandList.push(command);
    // 根据名称构建注册对象，并保存，等到调用的时候执行内部代码
    this.commands[command.name] = (...args: any) => {
        // 执行redo
        const { undo, redo } = command.execute(...args);
        redo();
        // 如果需要保存到queue中，则进行保存，游标加1
        if (command.followQueue) {
            if (this.queue.length > 0) {
                this.queue = this.queue.slice(0, this.current + 1); // 1 => 2 => 3 => 4 => 3 => 5， 4不会保留
            }
            this.queue.push({ undo, redo })
            this.current++;
        }
    }
    // 调用注册对象的init方法
    command.init && command.init();
  }

  // 注册撤销和重做
  registerRedoUndo() {
    // 注册撤销
    this.register({
        name: 'undo',
        keyboard: 'ctrl+z',
        followQueue: false,
        execute: (...args: any) => {
            return {
                undo: () => { /* console.log('undo撤销') */ },
                redo: () => {
                    console.log('执行撤销');
                    if (this.current === -1) return;
                    const { undo } = this.queue[this.current];
                    console.log('执行撤销函数', undo);
                    !!undo && undo();
                    this.current -= 1;
                }
            }
        }
    })
    // 注册重做
    this.register({
        name: 'redo',
        keyboard: ['ctrl+y', 'ctrl+shift+z'],
        followQueue: false,
        execute: (...args: any) => {
            return {
                undo: () => { /* console.log('redo撤销') */ },
                redo: () => {
                    console.log('执行重做');
                    const queueItem = this.queue[this.current + 1];
                    if (!!queueItem) {
                        queueItem.redo();
                        this.current++;
                    }
                }
            }
        }
    })
  }

  // 注册拖拽
  registerDrag() {
    const _this = this;
    this.register({
      name: 'drag',
      followQueue: true,
      init() {
          this.data = {
              before: null
          }
          // 添加订阅
          _this.dragEventService.startDrag$.subscribe((res: any) => {
            this.data.before = _.cloneDeep(_this.schemaService.schema.blocks);
          })
          _this.dragEventService.endDrag$.subscribe((res: any) => {
            _this.commands.drag(); // 其实就是redo，并且将拖拽redo audo保存一份到数组queue中，用于撤销操作
          })
          // 销毁订阅
          return () => {
              console.log('拖拽-销毁订阅');
              this.dragEventService.startDrag$.unsubsribe();
              this.dragEventService.endDrag$.unsubsribe();
          }
      },
      execute() {
          let before = this.data.before;
          let after = _.cloneDeep(_this.schemaService.schema.blocks);
          return {
              undo: () => {
                  console.log('undo撤回拖拽命令', before);
                  // updateBlocks(before);
                  // _this.schemaService.schema.blocks = before;
                  _this.schemaService.updateBlocks(before);
              },
              redo: () => {
                  console.log('redo拖拽命令', after);
                  // updateBlocks(after);
                  // _this.schemaService.schema.blocks = after;
                  _this.schemaService.updateBlocks(after);
              }
          }
      }
  })
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
      return init;
  }

  // 注册删除
  registerDelete() {  
     const _this = this;
     this.register({
      name: 'delete',
      keyboard: [
          'backspace',
          'delete',
          'ctrl+d'
      ],
      followQueue: true,
      execute: () => {
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
              }
          }
      }
  })
  }

  // 注册清空
  registerClear() {
    const _this = this;
    this.register({
      name: 'clear',
      followQueue: true,
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
              }
          }
      }
  })
  }

  // 注册置顶
  registerPlaceTop() {
    const _this = this;
    this.register({
      name: 'placeTop',
      keyboard: 'ctrl+up',
      followQueue: true,
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
                  _this.schemaService.updateBlocks(_.cloneDeep(before));
              },
              redo: () => {
                  console.log('redo置顶命令', after);
                  _this.schemaService.updateBlocks(_.cloneDeep(after));
              }
          }
      }
    });
  }

  // 注册置底
  registerPlaceBottom() {
     const _this = this;
     this.register({
      name: 'placeBottom',
      keyboard: 'ctrl+down',
      followQueue: true,
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
                  console.log('undo撤回置底命令', before);
                  _this.schemaService.updateBlocks(_.cloneDeep(before));
              },
              redo: () => {
                  console.log('redo置底命令', after);
                  _this.schemaService.updateBlocks(_.cloneDeep(after));
              }
          }
      }
  })
  }

  // 初始化
  init() {
    // 保存销毁函数
    this.commandList.forEach(command => !!command.init && this.commandDestoryList.push(command.init()));
    // 初始化键盘事件，添加移除事件
    this.commandDestoryList.push(this.keyboardEvent());
    // 注册撤销和重做
    this.registerRedoUndo();
    // // 注册拖拽
    this.registerDrag();
    this.registerDelete();
    this.registerClear();
    this.registerPlaceTop();
    this.registerPlaceBottom()
  }

  destroy() {
    this.commandDestoryList.forEach(fn => !!fn && fn());
  }
  
}
