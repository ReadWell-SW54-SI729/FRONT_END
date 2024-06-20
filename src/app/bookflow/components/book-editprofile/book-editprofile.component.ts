import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-editprofile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-editprofile.component.html',
  styleUrl: './book-editprofile.component.css'
})
export class BookEditprofileComponent implements OnInit {
  profileForm: FormGroup;
  profileImageSrc: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      description: [''],
      literaryPreferences: ['']
    });
  }

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageSrc = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      console.log('Form Data:', formData);
      }
  }
}
