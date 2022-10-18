import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { DropDataInterface } from '../directives/drop.directive';

@Component({
  selector: 'app-drag-draw',
  templateUrl: './drag-draw.component.html',
  styleUrls: ['./drag-draw.component.css']
})
export class DragDrawComponent implements OnInit {
    componentList: { id: string, type: string }[] = [];

    ngOnInit(): void {
        this.componentList.push({
            id: nanoid(),
            type: 'empty',
        });
    }

    ngAfterViewInit() {
    }

    getDropEvent(data: DropDataInterface) {
        // 首先根据id找到索引
        const idx = this.componentList.findIndex(item => item.id === data.currentAreaInfo.id);
        // 保证前后都有可插入区域
        this.componentList.splice(idx + 1, 0,
            {id: nanoid(), type: data.component},
            {id: nanoid(), type: 'empty'},
        );
    }

}
