import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-slot-availability-by-centres',
  templateUrl: './slot-availability-by-centres.component.html',
  styleUrls: ['./slot-availability-by-centres.component.css']
})
export class SlotAvailabilityByCentresComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}