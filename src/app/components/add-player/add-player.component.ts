import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  //object
  player: any = {};
  teams :any = [];
  //formId
  playerForm!: FormGroup;


  constructor(private playerServie: PlayerService,private tService : TeamService, private router: Router) { }

  ngOnInit(): void {
    //get all teams from DB:
    this.tService.getAllTeams().subscribe(
      (response)=> { console.log("here response from BE : ", response.teams);
        this.teams=response.teams
      }
    )
  }
  addPlayer() {
    // let players: any = JSON.parse(localStorage.getItem("players") || "[]");
    // console.log('Add Player BTN clicked', this.player);
    // this.player.id = this.generateID(players);
    // players.push(this.player);
    // localStorage.setItem("players", JSON.stringify(players));
console.log("here obj player :",this.player); // ajouté teamId :valeur de _id du team selectionné

    this.playerServie.addPlayer(this.player).subscribe(
      (response) => {
        console.log("here response after adding player", response);
        this.router.navigate(['/admin']);
      }
    );
  }
  // fonction pour generer un id(chercher l'id max et ajouter)
//   generateID(T: any) {
//     var max;
//     if (T.length == 0) {
//       max = 0;
//     }
//     else {
//       max = T[0].id
//       for (let i = 1; i < T.length; i++) {
//         if (T[i].id > max) { max = T[i].id; }
//       }
//     }
//     return max + 1;
//   }
 }

