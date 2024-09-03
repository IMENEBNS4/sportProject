import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   title:string = "bonjour"
  //déclaration 1: 
  //et l'appel en html un par un {{matchesAttrib}}{{playersAttrib}}{{teamsAttrib}}{{stadiumAttrib}}
  matchesAttrib: string = "Matches";
  playersAttrib: string = "Players";
  teamsAttrib: string = "Teams";
  stadiumAttrib: string = "Stadium";
  //déclaration 2:
  titles: any = ["Matches","Players","Teams","Stadium"];
  chaine:any="hello";

  constructor() { }

  ngOnInit(): void {
  }


}
