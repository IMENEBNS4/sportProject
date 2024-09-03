import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-players',
  templateUrl: './search-players.component.html',
  styleUrls: ['./search-players.component.css']
})
export class SearchPlayersComponent implements OnInit {
  searchPlayersForm !: FormGroup;
  playersResult: any = []

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchPlayersForm = this.formBuilder.group({
      Age: ['', [Validators.required]]
    })
  }


  searchPlayers() {
    console.log("searched", this.searchPlayersForm.value);


    let playersTab = JSON.parse(localStorage.getItem("players") || "[]");
    this.playersResult = playersTab.filter((elt: any) =>
      (elt.age >= this.searchPlayersForm.value.Age))


  }
}
