import { Component, ElementRef, HostListener, ViewChild,OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  menuExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  handleMouseover() {
    setTimeout(() => {
      this.menuExpanded = true;
    }, 0);
  }

  @HostListener('window:mousemove', ['$event'])
  listenToOutsideClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const dropdownMenu = this.dropdownMenu;

    if (!dropdownMenu) {
      return;
    }

    const isToggler = target.getAttribute('id') === 'navbarDropdown';

    if (
      !this.menuExpanded ||
      isToggler ||
      dropdownMenu.nativeElement.contains(target)
    ) {
      return;
    }

    this.menuExpanded = false;
  }
}
