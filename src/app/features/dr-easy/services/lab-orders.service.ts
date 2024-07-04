// LabOrders.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LabOrder } from '../models/lab-orders.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LabOrderService {
  private labOrders: LabOrder[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLabOrdersForUser();
    }
  }

  getLabOrders(): LabOrder[] {
    return this.labOrders;
  }

  addLabOrder(labOrder: LabOrder): void {
    labOrder.id = this.generateNextLabOrderId();
    this.labOrders.unshift(labOrder);
    this.saveLabOrdersForUser();
  }

  updateLabOrder(updatedLabOrder: LabOrder): void {
    const index = this.labOrders.findIndex(lo => lo.id === updatedLabOrder.id);
    if (index !== -1) {
      this.labOrders[index] = updatedLabOrder;
      this.saveLabOrdersForUser();
    }
  }

  deleteLabOrder(id: number): void {
    this.labOrders = this.labOrders.filter(lo => lo.id !== id);
    this.saveLabOrdersForUser();
  }

  private loadLabOrdersForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      const storedLabOrders = localStorage.getItem(`labOrders_${userId}`);
      if (storedLabOrders) {
        this.labOrders = JSON.parse(storedLabOrders);
      }
    }
  }

  private saveLabOrdersForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      localStorage.setItem(`labOrders_${userId}`, JSON.stringify(this.labOrders));
    }
  }

  private generateNextLabOrderId(): number {
    return this.labOrders.length > 0
           ? Math.max(...this.labOrders.map(lo => lo.id)) + 1
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
