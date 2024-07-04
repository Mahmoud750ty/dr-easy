import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Material } from '../models/materials.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private materials: Material[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMaterialsForUser();
    }
  }

  getMaterials(): Material[] {
    return this.materials;
  }

  addMaterial(material: Material): void {
    material.id = this.generateNextMaterialId();
    this.materials.unshift(material);
    this.saveMaterialsForUser();
  }

  updateMaterial(updatedMaterial: Material): void {
    const index = this.materials.findIndex(m => m.id === updatedMaterial.id);
    if (index !== -1) {
      this.materials[index] = updatedMaterial;
      this.saveMaterialsForUser();
    }
  }

  deleteMaterial(id: number): void {
    this.materials = this.materials.filter(m => m.id !== id);
    this.saveMaterialsForUser();
  }

  private loadMaterialsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      const storedMaterials = localStorage.getItem(`materials_${userId}`);
      if (storedMaterials) {
        this.materials = JSON.parse(storedMaterials);
      }
    }
  }

  private saveMaterialsForUser(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      localStorage.setItem(`materials_${userId}`, JSON.stringify(this.materials));
    }
  }

  private generateNextMaterialId(): number {
    return this.materials.length > 0
           ? Math.max(...this.materials.map(m => m.id)) + 1
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
