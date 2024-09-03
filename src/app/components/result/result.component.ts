import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  //etape1: rendre composant reult composant parametré:
  @Input() obj:any;
  //OBJ devient PARAMETRE DE APP RESULT car il y a avant lui @input 
  //on ne peut appeler app result qu'apres d'affecter une valeur à obj

  constructor() { }

  ngOnInit(): void {
  }

  resultColor(s1:number,s2:number){
    if (s1>s2) {
      return "green";
    } else if (s1<s2) {
      return "red";
    } else {
      return "blue"
    }

  }

  scoreResult(s1:number,s2:number){
    if (s1>s2) {
      return "WIN";
    } else if (s1<s2) {
      return "LOSS";
    } else {
      return "DRAW"
    }

  }



}
