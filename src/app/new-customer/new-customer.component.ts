import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! :FormGroup;

  constructor(private fb:FormBuilder  ,private customeService : CustomerService) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, Validators.required),
      email : this.fb.control(null, [Validators.required, Validators.email])

    });
  }

  handleSaveCustomer() {
    let customer : Customer =this.newCustomerFormGroup.value;
    this.customeService.saveCustomer(customer).subscribe({
      next : data=>{
        alert("customer saved succeded");
        this.newCustomerFormGroup.reset();
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
