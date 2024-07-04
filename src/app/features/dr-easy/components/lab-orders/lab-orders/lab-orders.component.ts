import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabOrder } from '../../../models/lab-orders.model';
import { LabOrderService } from '../../../services/lab-orders.service';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { CreateButtonComponent } from '../../../shared/create-button/create-button/create-button.component';
import { TableComponent } from '../../../shared/table/table/table.component';
import { ModalComponent } from '../../../shared/Modal/modal/modal.component';

@Component({
  selector: 'app-lab-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SearchBarComponent,
    CreateButtonComponent,
    TableComponent,
    ModalComponent
  ],
  templateUrl: './lab-orders.component.html',
  styleUrls: ['./lab-orders.component.scss']
})
export class LabOrdersComponent implements OnInit {
  visible = false;
  editMode = false;
  editedLabOrder: LabOrder | null = null;
  filteredLabOrders: LabOrder[] = [];

  labOrderForm: FormGroup;
  editForm: FormGroup;

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Patient', label: 'Patient' },
    { key: 'order_description', label: 'Order Description' },
    { key: 'day', label: 'Date' },
    { key: 'Delivered', label: 'Delivered' },
    { key: 'price', label: 'Price' },
    { key: 'payed', label: 'Paid' },
  ];

  constructor(
    private fb: FormBuilder,
    private labOrderService: LabOrderService
  ) {
    this.labOrderForm = this.createLabOrderForm();
    this.editForm = this.createLabOrderForm();
  }

  ngOnInit(): void {
    this.filteredLabOrders = this.labOrderService.getLabOrders();
  }

  createLabOrderForm(): FormGroup {
    return this.fb.group({
      Patient: ['', Validators.required],
      order_description: [''],
      day: [new Date(), Validators.required],
      Delivered: [false],
      price: [0, Validators.required],
      payed: [false],
    });
  }

  onSearch(searchText: string): void {
    this.filteredLabOrders = this.labOrderService.getLabOrders().filter(
      labOrder => labOrder.Patient.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onCreateLabOrder(): void {
    this.resetForms();
    this.editMode = false;
    this.visible = true;
  }

  onEditLabOrder(labOrder: LabOrder): void {
    this.editedLabOrder = { ...labOrder };
    this.editForm.patchValue({
      ...labOrder,
      day: new Date(labOrder.day)
    });
    this.editMode = true;
    this.visible = true;
  }

  onDeleteLabOrder(labOrder: LabOrder): void {
    this.labOrderService.deleteLabOrder(labOrder.id);
    this.filteredLabOrders = this.labOrderService.getLabOrders();
  }

  onSave(): void {
    if (this.editMode && this.editForm.valid && this.editedLabOrder) {
      const updatedLabOrder: LabOrder = {
        ...this.editedLabOrder,
        ...this.editForm.value,
        day: new Date(this.editForm.value.day).toISOString()
      };
      this.labOrderService.updateLabOrder(updatedLabOrder);
    } else if (!this.editMode && this.labOrderForm.valid) {
      const newLabOrder: LabOrder = {
        ...this.labOrderForm.value,
        id: 0,
        day: new Date(this.labOrderForm.value.day).toISOString()
      };
      this.labOrderService.addLabOrder(newLabOrder);
    }
    this.filteredLabOrders = this.labOrderService.getLabOrders();
    this.visible = false;
    this.resetForms();
  }

  onCancel(): void {
    this.visible = false;
    this.editedLabOrder = null;
    this.editMode = false;
    this.resetForms();
  }

  resetForms(): void {
    const defaultFormValues = {
      Patient: '',
      order_description: '',
      day: new Date(),
      Delivered: false,
      price: 0,
      payed: false
    };
    this.labOrderForm.reset(defaultFormValues);
    this.editForm.reset(defaultFormValues);
  }
}
