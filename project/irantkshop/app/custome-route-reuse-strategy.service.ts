import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { BaseRouteReuseStrategy } from './base-route-reuse-strategy.service';

export class CustomeRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig!.path === 'category/:id/:title';
  }

  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig!.path!, handle)
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.storedRoutes.get(route.routeConfig!.path!)
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(route.routeConfig!.path!) as DetachedRouteHandle
  }


}
