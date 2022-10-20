import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() props: any = {};

  constructor(private inject: Injector) { }

  ngOnInit(): void {
  }

}
