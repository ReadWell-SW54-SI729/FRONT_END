import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true

})
export class PaymentDetailsComponent implements OnInit {
  paymentForm!: FormGroup;
  paymentSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Formulario válido. Enviando datos de pago:', this.paymentForm.value);
      this.paymentSuccess = true;

      setTimeout(() => {
        console.log('Redirigiendo a la página de inicio...');
        this.router.navigate(['/home/Catalogue']);
      }, 3000);
    } else {
      console.log('Formulario inválido. No se puede enviar.');
    }
  }


}
