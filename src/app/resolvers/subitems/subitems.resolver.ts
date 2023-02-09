import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubitemsService } from 'src/app/services/subitem/subitems.service';

@Injectable({
  providedIn: 'root',
})
export class SubitemsResolver implements Resolve<boolean> {
  constructor(private SubItemService: SubitemsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const currentPage = +route.queryParamMap.get('page')!;
    const brands = route.queryParamMap.get('brands')!;
    const colors = route.queryParamMap.get('colors')!;
    const sizes = route.queryParamMap.get('sizes')!;
    return this.SubItemService.getItems(16, currentPage, brands, colors, sizes);
  }
}
