import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teamsTab: any = []

  T: any = [
    { x: 0, Tab: [4, 8, 15] },
    { x: 17, Tab: [10, 4] },
    { x: 8, Tab: [2] },
  ]

  display(id: number, msg: string) {
    alert("Team  :" + id + " " + msg);
  }
  constructor(private router: Router, private tService: TeamService) { }

  ngOnInit(): void {
    //this.teamsTab = JSON.parse(localStorage.getItem("teams") || "[]")
    this.tService.getAllTeams().subscribe(
      (data) => {
        console.log("here response from BE : ", data)
        this.teamsTab = data.teams;
      })
  }


  goToInfo(id: number) {
    this.router.navigate([`team-info/${name}`]);
  }

  deleteTeam(id : number){
    this.tService.deleteTeam(id).subscribe(
      (response)=> {
        console.log("la reponse  apres suppression d'un team est :" , response);
        //apres suppression retourner le tableau sans l'objet supprimé
        this.tService.getAllTeams().subscribe(
          (data)=>{  console.log("here is response from BE :" ,data);
           this.teamsTab=data.teams;
          }
        );
      }
     );  
  }

}
