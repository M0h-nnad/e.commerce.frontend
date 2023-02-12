import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterComponent } from './pages/register/register.component';
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
import { SubitemResolver } from './resolvers/subitem/subitem.resolver';
import { SubitemsResolver } from './resolvers/subitems/subitems.resolver';
import { AuthGuard } from './guards/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: 'product/:id',
    component: ProductPageComponent,
    resolve: { subitem: SubitemResolver },
  },
  {
    path: 'collection',
    component: CollectionComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { subItems: SubitemsResolver },
  },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'address-book', component: AddressBookComponent },
      { path: 'account-info', component: AccountInfoComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
