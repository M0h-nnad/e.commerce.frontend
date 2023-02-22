import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faX,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

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
  wishlist!: any;
  @HostListener('window:resize') Resize() {
    this.updateLayout();
  }
  constructor(
    @Inject('Window') window: Window,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly userService: UserService
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data: any) => {
        this.wishlist = data.data.sentObject.items;
      },
      error: (err: any) => this.toastr.error(err.error.messages),
    });
  }

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

  deleteFromFavorite(id: string, idx: number) {
    this.userService.deleteFromWishlist(id).subscribe({
      next: () => this.wishlist.splice(idx, 1),
      error: (err) => this.toastr.error(err.error.messages),
    });
  }
}
