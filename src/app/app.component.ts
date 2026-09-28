import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from './models/user';

type FormFields = {
  userEmail: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  userTel: string;
  dateOfBirth: string;
};

const emptyForm = (): FormFields => ({
  userEmail: '', userPassword: '', userFirstName: '', userLastName: '', userTel: '', dateOfBirth: ''
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  formData: FormFields = emptyForm();
  users: User[] = [
    new User('daranporn@gmail.com', 'yjdf1716', 'Sira', 'Weerakittana', '0891234567', '2012-05-26'),
    new User('boonpoj@gmail.com', 'mmjt9876', 'Rosanan', 'Suvanabhumiwong', '0641825563', '2011-10-17'),
    new User('bodin_thai@gmail.com', 'mmyb4577', 'Tankwan', 'Srisuk', '0986345661', '2007-04-29')
  ];
  alertType: 'success' | 'danger' | '' = '';
  alertMessage = '';

  get today(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  }

  register(form: NgForm): void {
    this.alertMessage = '';
    this.alertType = '';
    Object.values(form.controls).forEach(control => control.markAsTouched());

    if (form.invalid) {
      this.showError('Please complete all required fields correctly.');
      return;
    }
    // Check the telephone separately to display the required HTTP 400 alert.
    if (!/^\d+$/.test(this.formData.userTel.trim())) {
      this.showError('HTTP 400: Telephone number must contain numbers only.');
      return;
    }
    if (this.users.some(user => user.userEmail.toLowerCase() === this.formData.userEmail.trim().toLowerCase())) {
      this.showError('HTTP 422: This email address is already registered.');
      return;
    }

    try {
      const newUser = new User(
        this.formData.userEmail.trim(), this.formData.userPassword,
        this.formData.userFirstName.trim(), this.formData.userLastName.trim(),
        this.formData.userTel.trim(), this.formData.dateOfBirth
      );
      newUser.getAge();
      this.users.push(newUser);
      this.alertType = 'success';
      this.alertMessage = 'HTTP 201: Registration successful! Your account is ready.';
      form.resetForm(emptyForm());
    } catch {
      this.showError('HTTP 500: A script error occurred. Please check your date of birth.');
    }
  }

  ageOf(user: User): number {
    return user.getAge();
  }

  private showError(message: string): void {
    this.alertType = 'danger';
    this.alertMessage = message;
  }
}
