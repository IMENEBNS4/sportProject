import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  team: any = {};
  //formId
  teamForm!: FormGroup;

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
  }
  addTeam() {
    // let teams: any = JSON.parse(localStorage.getItem("teams") || "[]");
    // console.log('Add team BTN clicked', this.team);
    // this.team.id = this.generateID(teams);
    // teams.push(this.team);
    // localStorage.setItem("teams", JSON.stringify(teams));
    console.log("here team Obj :", this.team);
    
    this.teamService.addTeam(this.team).subscribe(
      (response) => {
        console.log("here response from BE", response);
        this.router.navigate(['/admin']);
      }
    );
  }
  // fonction pour generer un id(chercher l'id max et ajouter)
  generateID(T: any) {
    var max;
    if (T.length == 0) {
      max = 0;
    }
    else {
      max = T[0].id
      for (let i = 1; i < T.length; i++) {
        if (T[i].id > max) { max = T[i].id; }
      }
    }
    return max + 1;
  }
}

