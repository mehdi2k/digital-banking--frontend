import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/accounts.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup;
  currentPage :number=0;
  pageSize : number=5;
  accountObservable! : Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage! : String;

  constructor(private fb: FormBuilder, private accountService : AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId :this.fb.control('')
    });

    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })

  }

  handleSerachAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err =>{
        this.errorMessage =err.message;
        return throwError(err);
      })
    )
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSerachAccount();
  }

  handleAccountOperation() {
    let accountId =this.accountFormGroup.value.accountId;
    let amount =this.operationFormGroup.value.amount;
    let description =this.operationFormGroup.value.description;
    let accountDestination =this.operationFormGroup.value.accountDestination;
    let operationType =this.operationFormGroup.value.operationType;
    if(operationType=='DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({
        next : (data)=>{
          alert("operation succeded");
          this.operationFormGroup.reset();
          this.handleSerachAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }else if(operationType=='CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next : (data)=>{
          alert('operation succeded');
          this.operationFormGroup.reset();
          this.handleSerachAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }else if(operationType =='TRANSFER'){
      this.accountService.transfer(accountId,accountDestination,amount,description).subscribe({
        next : (data)=>{
          alert('operation succeded');
          this.operationFormGroup.reset();
          this.handleSerachAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }

  }
}
