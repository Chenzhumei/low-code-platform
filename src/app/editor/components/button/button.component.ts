import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { token } from '../../layout/visual-editor-content/visual-editor-content.component';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  dataIn: any;
  @Input() props: any = {};

  constructor(private inject: Injector) { }

  ngOnInit(): void {
    // this.dataIn = this.inject.get(token)

  }

}
