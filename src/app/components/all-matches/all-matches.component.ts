import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.css']
})
export class AllMatchesComponent implements OnInit {
  matchesTab:any =[
    {id:1,scoreone:4,scoretwo:2,teamone:"FCB",teamtwo:"PSG"},
    {id:2,scoreone:1,scoretwo:1,teamone:"CIT",teamtwo:"PSG"},
    {id:3,scoreone:3,scoretwo:2,teamone:"FCB",teamtwo:"ROM"},
    {id:4,scoreone:3,scoretwo:5,teamone:"RMD",teamtwo:"PSG"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
