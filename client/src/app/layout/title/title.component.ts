import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = '';
    this.breadcrumbs = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.currentTitle.subscribe((t: string) => { this.title = t; });
      this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => { this.breadcrumbs = bc; });
    }, 1);
  }
}