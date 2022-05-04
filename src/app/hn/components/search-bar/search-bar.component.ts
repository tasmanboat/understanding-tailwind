import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searched: EventEmitter<string> = new EventEmitter<string>();
  @Input() keyword: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
