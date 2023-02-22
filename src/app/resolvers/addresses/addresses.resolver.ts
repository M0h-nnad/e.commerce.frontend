import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddressService } from 'src/app/services/address/address.service';

@Injectable({
  providedIn: 'root',
})
export class AddressesResolver implements Resolve<any> {
  constructor(private readonly addressService: AddressService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.addressService.getAddress();
  }
}
