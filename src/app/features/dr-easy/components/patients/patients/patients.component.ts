import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Patient } from '../../../models/patients.model';
import { PatientService } from '../../../services/patients.service';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { CreateButtonComponent } from '../../../shared/create-button/create-button/create-button.component';
import { TableComponent } from '../../../shared/table/table/table.component';
import { ModalComponent } from '../../../shared/Modal/modal/modal.component';

@Component({
  selector: 'app-patients',
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
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  visible = false;
  editMode = false;
  editedPatient: Patient | null = null;
  filteredPatients: Patient[] = [];

  patientForm: FormGroup;
  editForm: FormGroup;

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Patient', label: 'Name' },
    { key: 'Patient_description', label: 'Description' },
    { key: 'day', label: 'Date' },
    { key: 'price', label: 'Price' },
    { key: 'phone', label: 'Phone' },
    { key: 'details', label: 'Details' },
    { key: 'payed', label: 'Paid' },
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.createPatientForm();
    this.editForm = this.createPatientForm();
  }

  ngOnInit(): void {
    this.filteredPatients = this.patientService.getPatients();
  }

  createPatientForm(): FormGroup {
    return this.fb.group({
      Patient: ['', Validators.required],
      Patient_description: [''],
      day: [new Date(), Validators.required],
      price: [0, Validators.required],
      payed: [0, Validators.required],
      phone: [''],
      details: ['']
    });
  }

  onSearch(searchText: string): void {
    this.filteredPatients = this.patientService.getPatients().filter(
      patient => patient.Patient.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onCreatePatient(): void {
    this.resetForms();
    this.editMode = false;
    this.visible = true;
  }

  onEditPatient(patient: Patient): void {
    this.editedPatient = { ...patient };
    this.editForm.patchValue({
      ...patient,
      day: new Date(patient.day)
    });
    this.editMode = true;
    this.visible = true;
  }

  onDeletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient.id);
    this.filteredPatients = this.patientService.getPatients();
  }

  onSave(): void {
    if (this.editMode && this.editForm.valid && this.editedPatient) {
      const updatedPatient: Patient = {
        ...this.editedPatient,
        ...this.editForm.value,
        day: new Date(this.editForm.value.day)
      };
      this.patientService.updatePatient(updatedPatient);
    } else if (!this.editMode && this.patientForm.valid) {
      const newPatient: Patient = {
        ...this.patientForm.value,
        id: 0,
        day: new Date(this.patientForm.value.day)
      };
      this.patientService.addPatient(newPatient);
    }
    this.filteredPatients = this.patientService.getPatients();
    this.visible = false;
    this.resetForms();
  }

  onCancel(): void {
    this.visible = false;
    this.editedPatient = null;
    this.editMode = false;
    this.resetForms();
  }

  resetForms(): void {
    const defaultFormValues = {
      Patient: '',
      Patient_description: '',
      day: new Date(),
      price: 0,
      payed: 0,
      phone: '',
      details: ''
    };
    this.patientForm.reset(defaultFormValues);
    this.editForm.reset(defaultFormValues);
  }
}
