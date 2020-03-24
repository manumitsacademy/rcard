import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {
  transactionhistory: any;

  constructor(public http:HttpClient) { }

  ngOnInit() {
    
    this.http.get("/assets/statement.xml",{  
      headers: new HttpHeaders()  
        .set('Content-Type', 'text/xml')  
        .append('Access-Control-Allow-Methods', 'GET')  
        .append('Access-Control-Allow-Origin', '*')  
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
      responseType: 'text'  
    }).subscribe((res)=>{
      const parser = new xml2js.Parser({ strict: false, trim: true });
      parser.parseString(res, (err, result) => {
        this.transactionhistory = result['SOAP:ENVELOPE']['SOAP:BODY'][0]['PCBFGATEWAYGETAPPSTATUSRESPONSE'][0]['PCBFAPPSTATUS'];
        console.log(this.transactionhistory)
      });
    })
  }

}
