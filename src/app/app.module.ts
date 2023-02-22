import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule, NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { BarRatingModule } from 'ngx-bar-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { WindowService } from './services/window.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddressBookComponent } from './pages/address-book/address-book.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { SubitemResolver } from './resolvers/subitem/subitem.resolver';
import { SubitemsResolver } from './resolvers/subitems/subitems.resolver';
import { AddressesResolver } from './resolvers/addresses/addresses.resolver';
import { WishlistResolver } from './resolvers/wishlist/wishlist.resolver';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CollectionComponent,
    ProductComponent,
    ProductPageComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    ProfileComponent,
    DashboardComponent,
    AddressBookComponent,
    ChangePasswordComponent,
    MyOrdersComponent,
    AccountInfoComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    BarRatingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSidenavModule,
    NgbNavModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [
    { provide: 'Window', useValue: window },
    WindowService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SubitemResolver,
    SubitemsResolver,
    AddressesResolver,
    WishlistResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
