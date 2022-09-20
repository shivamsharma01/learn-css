import { Component, OnInit } from '@angular/core';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  faExternalLink = faExternalLink;

  constructor() {}

  ngOnInit(): void {}
}
