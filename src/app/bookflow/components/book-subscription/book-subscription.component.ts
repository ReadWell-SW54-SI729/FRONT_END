import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {PaymentDetailsComponent} from "../payment-details/payment-details.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-subscription',
  templateUrl: './book-subscription.component.html',
  styleUrls: ['./book-subscription.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, PaymentDetailsComponent]
})
export class BookSubscriptionComponent implements OnInit {
  subscriptionForm!: FormGroup;
  showPaymentForm = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.subscriptionForm = this.formBuilder.group({
      plan: ['', Validators.required]
    });
  }

  onSubmit(plan: string) {
    this.subscriptionForm.patchValue({plan: plan});
    if (this.subscriptionForm.valid) {
      this.router.navigate(['/home/subscription/details']);
    }
  }

  onFreePlan() {
    this.router.navigate(['home/Catalogue']);
  }
}
