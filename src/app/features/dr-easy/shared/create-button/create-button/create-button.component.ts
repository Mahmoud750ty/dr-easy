import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent {
  @Input() label: string = 'Create';
  @Output() create = new EventEmitter<void>();

  faPlus = faPlus;

  onClick() {
    this.create.emit();
  }
}
