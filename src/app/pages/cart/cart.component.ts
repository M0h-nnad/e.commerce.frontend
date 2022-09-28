import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faX = faX;
  window;
  isMobile = false;

  @HostListener('window:resize') Resize() {
    this.updateLayout();
  }
  constructor(@Inject('Window') window: Window) {
    this.window = window;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateLayout();
    }, 0);
  }
  updateLayout() {
    const width = this.window.innerWidth;
    if (width < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
