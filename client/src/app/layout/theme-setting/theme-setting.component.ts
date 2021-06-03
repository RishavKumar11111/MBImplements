import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.css']
})
export class ThemeSettingComponent implements OnInit {
  ON: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}