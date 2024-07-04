import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

interface ChartData {
  label: string;
  cost: number;
  admitted: number;
  outpatient: number;
}

@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.scss'],
  standalone: true,
  imports: [ CommonModule  ],
})
export class ClinicProfileComponent {
  totalPatients = 300; // Replace with actual values from your service
  totalAppointments = 500; // Replace with actual values from your service
  totalLabOrders = 100; // Replace with actual values from your service
  totalMaterials = 200;

  chartData: ChartData[] = [
    { label: '1-Jan', cost: 3000, admitted: 2800, outpatient: 3200 },
    { label: '1-Feb', cost: 3200, admitted: 3000, outpatient: 2900 },
    { label: '1-Mar', cost: 1800, admitted: 3800, outpatient: 3500 },
    { label: '1-Apr', cost: 3000, admitted: 2800, outpatient: 3200 },
    { label: '1-May', cost: 2800, admitted: 3200, outpatient: 3000 },
    { label: '1-Jun', cost: 2200, admitted: 2500, outpatient: 3800 },
    { label: '1-Jul', cost: 3200, admitted: 2800, outpatient: 1800 },
    { label: '1-Aug', cost: 2700, admitted: 2900, outpatient: 2600 },
    { label: '1-Sep', cost: 1900, admitted: 2600, outpatient: 3000 },
    { label: '1-Oct', cost: 2800, admitted: 3100, outpatient: 2900 },
    { label: '1-Nov', cost: 2500, admitted: 2800, outpatient: 2700 },
    { label: '1-Dec', cost: 2200, admitted: 3000, outpatient: 2800 },
  ];

  getMaxValue(): number {
    const allValues = this.chartData.flatMap((data) => [
      data.cost,
      data.admitted,
      data.outpatient,
    ]);
    return Math.max(...(allValues.filter((v) => v !== undefined) as number[]));
  }
}
