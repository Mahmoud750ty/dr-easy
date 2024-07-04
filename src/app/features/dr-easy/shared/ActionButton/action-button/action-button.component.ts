import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() type = 'button'; // Default type: button
  @Input() color = 'default'; // Default color: default
  @Output() click = new EventEmitter<void>();

  handleClick(): void {
    this.click.emit();
  }
}
