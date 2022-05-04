import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hit',
  templateUrl: './hit.component.html',
  styleUrls: ['./hit.component.scss']
})
export class HitComponent implements OnInit {
  @Input() title: string = '';
  @Input() points: number = -1;
  @Input() url: string = '';
  @Input() created_at_i: number = -1;
  constructor() { }

  ngOnInit(): void {
  }

}
