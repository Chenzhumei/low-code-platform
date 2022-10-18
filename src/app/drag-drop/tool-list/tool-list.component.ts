import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent implements OnInit {
  componentList = [
    {label: '文本', type: 'text'},
    {label: '列表', type: 'list'},
    {label: '输入框', type: 'input'},
];
  constructor() { }

  ngOnInit(): void {
  }

}
