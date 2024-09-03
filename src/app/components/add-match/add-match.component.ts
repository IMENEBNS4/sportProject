import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  constructor(private mService:MatchService, private router:Router ) { }
  match: any = {}; //attribut initiallement vide 
  matchForm !: FormGroup; //matchForm un id de type formGroup(ensemble d'input) non initialisé initiallement (!:)


  ngOnInit() {
  
  }

  generateId(T: any) {
    let max;
    if (T.length == 0) {
      max = 0;
    }
    else {
      max = T[0].id;
      for (let i = 1; i < T.length; i++) {
        if (max < T[i].id) {
          max = T[i].id;
        }
      }
    }

    return max + 1;
  }

  addMatch() {
     console.log("AddMatch BTN clicked", this.match);//this.match = objet récupéré du formulaire
     this.mService.addMatch(this.match).subscribe(
      (response)=> {
        console.log("la reponse  apres ajout d'un match est :" , response);
        this.router.navigate(['/admin'])
      }
     );  


    // var matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // this.match.id=this.generateId(matchesTab)
    // matchesTab.push(this.match)
    // localStorage.setItem("matches", JSON.stringify(matchesTab));
  }

}
