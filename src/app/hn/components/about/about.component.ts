import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  thirdPartyLibraries: ThirdPartyLibrary[] = [
    { name: 'Tailwind CSS', url: 'https://www.npmjs.com/package/tailwindcss' },
    { name: 'daisyUI', url: 'https://www.npmjs.com/package/daisyui' },
    { name: 'Material Icons - Google Fonts', url: 'https://fonts.google.com/icons' },
    { name: 'ngx-pagination', url: 'https://www.npmjs.com/package/ngx-pagination' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}

interface ThirdPartyLibrary {
  name: string;
  url: string;
}
