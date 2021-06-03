import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(private layoutService: LayoutService) {
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