import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../../service/commands.service';
import { SchemaService } from '../../service/schema.service';

@Component({
  selector: 'app-visual-editor-header',
  templateUrl: './visual-editor-header.component.html',
  styleUrls: ['./visual-editor-header.component.scss']
})
export class VisualEditorHeaderComponent implements OnInit {

  constructor(
    public commandsService: CommandsService,
    private schemaService: SchemaService,
  ) { }

  ngOnInit(): void {
  }

  save() {
    sessionStorage.setItem('myschema', JSON.stringify(this.schemaService.schema));
    alert('save success.');
  }

}
