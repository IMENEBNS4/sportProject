import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm !: FormGroup;
  match: any = {};
  matchID: any;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private mService: MatchService) { } //:router navige d'un composanat a un autre

  ngOnInit() {
    this.matchID = this.activateRoute.snapshot.params['id']; //Récupere l'id du path
    // à l'initialisation remplir le formulaire par les donnees d'obj à modifier
    //apl du service pour récupérer le match dont l id récupéré du path
    this.mService.getMatchById(this.matchID).subscribe(//reponse versé dans data
      (data) => {
        console.log('here data from BE', data)  //data contient objet cherché
        this.match = data.match; //m reponse venant du service
      } 
    );
  }

  editMatch() {
    // let matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // for (let i = 0; i < matchesTab.length; i++) {
    //   if (this.matchID == matchesTab[i].id) {
    //     matchesTab[i] = this.match; //l'elt new saisie en html nsobbouh fel objet l 9dim venant du ls (matchesTab[i])
    //     break;
    //   }
    // }
    // localStorage.setItem("matches", JSON.stringify(matchesTab));

    this.mService.editMatch(this.match).subscribe( //this.match est le nouveau objet
      (response) => {
        console.log("la reposne apres modification", response);
        this.router.navigate(['admin'])
      }
    );



  }


}
