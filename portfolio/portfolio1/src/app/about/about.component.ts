import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  links!: NodeListOf<Element>;
  tabs!: NodeListOf<Element>;
  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const htmlElement: HTMLElement = this.elementRef.nativeElement;
    this.links = htmlElement.querySelectorAll('.tab-links');
    this.tabs = htmlElement.querySelectorAll('.tab-contents');
  }

  onClick(event:any , title: string) : void {
    this.links.forEach(n => {
      n.classList.remove('active-link');
    });
    this.tabs.forEach(n => {
      if (n.id === title) n.classList.add('active-tab');
      else n.classList.remove('active-tab');
    });
    event.currentTarget.classList.add('active-link');
  }
}
