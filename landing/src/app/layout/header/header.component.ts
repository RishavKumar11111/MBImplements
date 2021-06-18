import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // counter: number;

  constructor(
    private scroller: ViewportScroller,
    private router: Router
  ) {
    // this.counter = 0;
  }

  ngOnInit(): void {
    // window.addEventListener('scroll', this.resetScroll, true);
  }

  ngOnDestroy() {
    // window.removeEventListener('scroll', this.resetScroll, true);
  }

  // resetScroll = (event: any): void => {
  //   if (this.router.url.indexOf('mainContent') > -1 && this.counter !== 1) {
  //     this.router.navigate([], {
  //       fragment: ''
  //     });
  //   }
  //   this.counter = 0;
  // }

  gotoMainContent() {
    document.getElementById('mainContent')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });

    // this.scroller.scrollToAnchor('mainContent');

    // this.counter = 1;
    // this.router.navigate([], {
    //   fragment: 'mainContent'
    // });
  }
}