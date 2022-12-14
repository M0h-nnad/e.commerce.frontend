import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, AfterViewInit {
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  isBrandOpen = true;
  isColorOpen = true;
  isSizeOpen = true;
  window: any;
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
    console.log(width);
    if (width < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
