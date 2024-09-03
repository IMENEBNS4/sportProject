import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {
stadiumTab:any=[
 {name:"Rades",country:"tunisia",capacity:45000},
 {name:"capnew",country:"spain",capacity:60000},
 {name:"bernabew",country:"spain",capacity:90000},

]



display(id:number,msg:string){
  alert("Match N° :" + id+ " " + msg);
}


  constructor() { }

  ngOnInit(): void {
  }

}
