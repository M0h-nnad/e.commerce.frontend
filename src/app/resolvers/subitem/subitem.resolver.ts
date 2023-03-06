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
export class SubitemResolver implements Resolve<boolean> {
  constructor(private readonly subItemService: SubitemsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id') as string;
    return this.subItemService.getItem(id);
  }
}
