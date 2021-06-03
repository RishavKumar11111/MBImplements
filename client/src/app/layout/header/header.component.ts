import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
    // private cookieService: CookieService
  ) {
    this.username = '';
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername()!;
  }

  signOut() {
    this.authService.signOut().subscribe((result: any) => {
      // this.cookieService.delete('auth.cookie', '/', 'localhost', true, "Strict");
      this.authService.clearLocalStorage();
      this.router.navigate(['/']);
    }, (error) => this.toastr.error(error.statusText, error.status));
  }
}