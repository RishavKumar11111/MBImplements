import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  role: string;

  constructor(private authService: AuthService) {
    this.role = '';
  }

  ngOnInit(): void {
    this.role = this.authService.getRole()!;
  }
}