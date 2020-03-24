import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-ministatement',
  templateUrl: './ministatement.component.html',
  styleUrls: ['./ministatement.component.css']
})
export class MinistatementComponent implements OnInit {

  constructor(public http:HttpClient) { }
  ministatement:any;
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
        this.ministatement = result['SOAP:ENVELOPE']['SOAP:BODY'][0]['PCBFGATEWAYGETAPPSTATUSRESPONSE'][0]['PCBFAPPSTATUS'];
      });
    })
  }

}
