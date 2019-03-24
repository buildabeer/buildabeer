import { Component, OnInit } from '@angular/core';
import { DesignerService } from '../../recipes/designer.service';

@Component({
  selector: 'app-chill-runner',
  templateUrl: './chill-runner.component.html',
  styleUrls: ['./chill-runner.component.scss']
})
export class ChillRunnerComponent implements OnInit {

  timer = 20;
  chill_method = 'ice';

  constructor(public _designer: DesignerService) { }

  ngOnInit() {
  }

}
