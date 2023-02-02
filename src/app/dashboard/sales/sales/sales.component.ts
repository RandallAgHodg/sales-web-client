import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Sale } from 'src/app/types/sales/sales.type';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [],
})
export class SalesComponent implements OnInit {
  isLoadingSales!: boolean;
  sales: Sale[] = [];
  constructor(
    private readonly _salesService: SalesService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.isLoadingSales = true;
    this.getAllSales();
    this.isLoadingSales = false;
  }

  getAllSales() {
    this._salesService.getAllSales().subscribe((resp) => {
      this.sales = resp;
      console.log(resp);
    });
  }
}
