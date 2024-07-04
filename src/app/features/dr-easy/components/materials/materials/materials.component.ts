import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Material } from '../../../models/materials.model';
import { MaterialService } from '../../../services/material.service';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar/search-bar.component';
import { CreateButtonComponent } from '../../../shared/create-button/create-button/create-button.component';
import { TableComponent } from '../../../shared/table/table/table.component';
import { ModalComponent } from '../../../shared/Modal/modal/modal.component';

@Component({
  selector: 'app-materials',
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
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  visible = false;
  editMode = false;
  editedMaterial: Material | null = null;
  filteredMaterials: Material[] = [];

  materialForm: FormGroup;
  editForm: FormGroup;

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'material', label: 'Name' },
    { key: 'day', label: 'Date' },
    { key: 'price', label: 'Price' },
    { key: 'details', label: 'Details' },
  ];

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService
  ) {
    this.materialForm = this.createMaterialForm();
    this.editForm = this.createMaterialForm();
  }

  ngOnInit(): void {
    this.filteredMaterials = this.materialService.getMaterials();
  }

  createMaterialForm(): FormGroup {
    return this.fb.group({
      material: ['', Validators.required],
      material_description: [''],
      day: [new Date(), Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      supplier: [''],
      details: ['']
    });
  }

  onSearch(searchText: string): void {
    this.filteredMaterials = this.materialService.getMaterials().filter(
      material => material.material.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onCreateMaterial(): void {
    this.resetForms();
    this.editMode = false;
    this.visible = true;
  }

  onEditMaterial(material: Material): void {
    this.editedMaterial = { ...material };
    this.editForm.patchValue({
      ...material,
      day: new Date(material.day)
    });
    this.editMode = true;
    this.visible = true;
  }

  onDeleteMaterial(material: Material): void {
    this.materialService.deleteMaterial(material.id);
    this.filteredMaterials = this.materialService.getMaterials();
  }

  onSave(): void {
    if (this.editMode && this.editForm.valid && this.editedMaterial) {
      const updatedMaterial: Material = {
        ...this.editedMaterial,
        ...this.editForm.value,
        day: new Date(this.editForm.value.day)
      };
      this.materialService.updateMaterial(updatedMaterial);
    } else if (!this.editMode && this.materialForm.valid) {
      const newMaterial: Material = {
        ...this.materialForm.value,
        id: 0,
        day: new Date(this.materialForm.value.day)
      };
      this.materialService.addMaterial(newMaterial);
    }
    this.filteredMaterials = this.materialService.getMaterials();
    this.visible = false;
    this.resetForms();
  }

  onCancel(): void {
    this.visible = false;
    this.editedMaterial = null;
    this.editMode = false;
    this.resetForms();
  }

  resetForms(): void {
    const defaultFormValues = {
      material: '',
      material_description: '',
      day: new Date(),
      price: 0,
      quantity: 0,
      supplier: '',
      details: ''
    };
    this.materialForm.reset(defaultFormValues);
    this.editForm.reset(defaultFormValues);
  }
}
