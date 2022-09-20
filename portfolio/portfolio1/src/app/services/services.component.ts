import { Component, OnInit } from '@angular/core';
import { faCode, faCrop, faStore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  faCode = faCode;
  faCrop = faCrop;
  faStore = faStore;
  constructor() {}

  ngOnInit(): void {}
}
