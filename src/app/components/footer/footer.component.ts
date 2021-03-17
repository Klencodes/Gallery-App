import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  constructor() { }
  dateCopyright = new Date().getFullYear();

  ngOnInit(): void {
  }

}
