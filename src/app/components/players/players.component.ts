import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {


  playersTab: any=
  [
    { Name: "ALI", Position: "ATK", Number: 23, Age: 26 },
    { Name: "SALAH", Position: "DEF", Number: 4, Age: 28 },
    { Name: "AHMED", Position: "GAO", Number: 12, Age: 23 },


  ]
  constructor() { }

  ngOnInit(): void {
  }

}
