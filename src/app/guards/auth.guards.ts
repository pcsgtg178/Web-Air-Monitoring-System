import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.afAuth.authState
        .pipe(take(1))
        .pipe(map(user => !!user))
        .pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    }))
  }
}
