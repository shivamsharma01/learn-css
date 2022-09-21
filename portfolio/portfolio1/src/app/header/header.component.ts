import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('sidemenu') sidemenu!: ElementRef;

  constructor(public elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.sidemenu) this.sidemenu.nativeElement.style.right = '-200px';
  }

  toggleMenu(isShow: boolean) {
    console.log(isShow);
    if (this.sidemenu) {
      if (isShow) this.sidemenu.nativeElement.style.right = '0';
      else this.sidemenu.nativeElement.style.right = '-200px';
    }
  }
}
