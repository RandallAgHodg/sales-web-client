import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Sale } from '../../../types/sales/sales.type';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styles: [],
})
export class SaleComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
