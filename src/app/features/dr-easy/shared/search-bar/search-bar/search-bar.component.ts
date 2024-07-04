import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search';
  @Output() searchChange = new EventEmitter<string>();

  searchForm: FormGroup;
  faSearch = faSearch;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(value => {
      this.searchChange.emit(value);
    });
  }
}
