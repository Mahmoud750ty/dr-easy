// patient.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Patient } from '../models/patients.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPatientsForUser();
    }
  }

  getPatients(): Patient[] {
    return this.patients;
  }

  addPatient(patient: Patient): void {
    patient.id = this.generateNextPatientId();
    this.patients.unshift(patient);
    this.savePatientsForUser();
  }

  updatePatient(updatedPatient: Patient): void {
    const index = this.patients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      this.patients[index] = updatedPatient;
      this.savePatientsForUser();
    }
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter(p => p.id !== id);
    this.savePatientsForUser();
  }

  // Load patients for the logged-in user
  private loadPatientsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      const storedPatients = localStorage.getItem(`patients_${userId}`);
      if (storedPatients) {
        this.patients = JSON.parse(storedPatients);
      }
    }
  }

  // Save patients for the logged-in user
  private savePatientsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      localStorage.setItem(`patients_${userId}`, JSON.stringify(this.patients));
    }
  }

  private generateNextPatientId(): number {
    return this.patients.length > 0
           ? Math.max(...this.patients.map(p => p.id)) + 1
           : 1;
  }

  private getCurrentUserId(): string | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.uid;
    }
    return null;
  }
}
