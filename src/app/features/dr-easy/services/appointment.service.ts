import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: Appointment[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAppointmentsForUser();
    }
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  addAppointment(appointment: Appointment): void {
    appointment.id = this.generateNextAppointmentId();
    this.appointments.unshift(appointment);
    this.saveAppointmentsForUser();
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const index = this.appointments.findIndex(a => a.id === updatedAppointment.id);
    if (index !== -1) {
      this.appointments[index] = updatedAppointment;
      this.saveAppointmentsForUser();
    }
  }

  deleteAppointment(id: number): void {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.saveAppointmentsForUser();
  }

  private loadAppointmentsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      const storedAppointments = localStorage.getItem(`appointments_${userId}`);
      if (storedAppointments) {
        this.appointments = JSON.parse(storedAppointments);
      }
    }
  }

  private saveAppointmentsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      localStorage.setItem(`appointments_${userId}`, JSON.stringify(this.appointments));
    }
  }

  private generateNextAppointmentId(): number {
    return this.appointments.length > 0
           ? Math.max(...this.appointments.map(a => a.id)) + 1
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
