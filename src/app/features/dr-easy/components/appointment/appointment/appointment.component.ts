import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { CreateButtonComponent } from '../../../shared/create-button/create-button/create-button.component';
import { TableComponent } from '../../../shared/table/table/table.component';
import { ModalComponent } from '../../../shared/Modal/modal/modal.component';

@Component({
  selector: 'app-appointments',
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
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  visible = false;
  editMode = false;
  editedAppointment: Appointment | null = null;
  filteredAppointments: Appointment[] = [];

  appointmentForm: FormGroup;
  editForm: FormGroup;

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Patient', label: 'Name' },
    { key: 'day', label: 'Date' },
    { key: 'phone', label: 'Phone' },
    { key: 'details', label: 'Details' },
    { key: 'payed', label: 'Paid' },
  ];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.createAppointmentForm();
    this.editForm = this.createAppointmentForm();
  }

  ngOnInit(): void {
    this.filteredAppointments = this.appointmentService.getAppointments();
  }

  createAppointmentForm(): FormGroup {
    return this.fb.group({
      Patient: '',
      day: new Date(),
      next_appointment: new Date(),
      phone: '',
      details: '',
      isdone: false,
      price: 0,
      payed: 0,
      Patient_description: '',
    });
  }

  onSearch(searchText: string): void {
    this.filteredAppointments = this.appointmentService.getAppointments().filter(
      appointment => appointment.Patient.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onCreateAppointment(): void {
    this.resetForms();
    this.editMode = false;
    this.visible = true;
  }

  onEditAppointment(appointment: Appointment): void {
    this.editedAppointment = { ...appointment };
    this.editForm.patchValue({
      ...appointment,
      day: new Date(appointment.day)
    });
    this.editMode = true;
    this.visible = true;
  }

  onDeleteAppointment(appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment.id);
    this.filteredAppointments = this.appointmentService.getAppointments();
  }

  onSave(): void {
    if (this.editMode && this.editForm.valid && this.editedAppointment) {
      const updatedAppointment: Appointment = {
        ...this.editedAppointment,
        ...this.editForm.value,
        day: new Date(this.editForm.value.day)
      };
      this.appointmentService.updateAppointment(updatedAppointment);
    } else if (!this.editMode && this.appointmentForm.valid) {
      const newAppointment: Appointment = {
        ...this.appointmentForm.value,
        id: 0,
        day: new Date(this.appointmentForm.value.day)
      };
      this.appointmentService.addAppointment(newAppointment);
    }
    this.filteredAppointments = this.appointmentService.getAppointments();
    this.visible = false;
    this.resetForms();
  }

  onCancel(): void {
    this.visible = false;
    this.editedAppointment = null;
    this.editMode = false;
    this.resetForms();
  }

  resetForms(): void {
    const defaultFormValues = {
      Patient: '',
      day: new Date(),
      next_appointment: new Date(),
      phone: '',
      details: '',
      isdone: false,
      Patient_description: '',
    };
    this.appointmentForm.reset(defaultFormValues);
    this.editForm.reset(defaultFormValues);
  }
}
