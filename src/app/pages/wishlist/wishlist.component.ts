import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faX,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, AfterViewInit {
  faX = faX;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faCartShopping = faCartShopping;
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
