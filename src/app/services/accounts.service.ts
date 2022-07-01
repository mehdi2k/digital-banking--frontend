import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/accounts.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : String, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId : String, amount : number, description : String ):Observable<AccountDetails>{
    let data ={accountId : accountId, amount : amount, description : description }
    return this.http.post<AccountDetails>(environment.backendHost+"/accounts/debit",data);
  }

  public credit(accountId :String, amount :number, description : String){
    let data ={accountId : accountId, amount : amount, description : description }
    return this.http.post<AccountDetails>(environment.backendHost+"/accounts/credit",data);
  }

  public transfer(accountSource :String,accountDestination :String, amount :number, description : String){
    let data ={accountSource,accountDestination, amount, description }
    return this.http.post<AccountDetails>(environment.backendHost+"/accounts/transfer",data);
  }
}
