import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matchesTab: any = [];

  T: any = [
    { x: 0, tab: [4, 8, 15] },
    { x: 17, tab: [10, 4] },
    { x: 8, tab: [2] },
  ]


  display(id: number, msg: string) {
    alert("Match N° :" + id + " " + msg);
  }

  constructor(private router: Router, private mService: MatchService) { }//instance de type Router qui assure la navigation entre les composants

  ngOnInit() { // cmposant fait appel au service
    // this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    this.mService.getAllMatches().subscribe(
      (response)=>{  console.log("here is response from BE :" ,response);
        this.matchesTab=response.T;
      }
    ); //appel d'un service specialement d'une req dans un component
  }


  resultColor(s1: number, s2: number) {
    if (s1 > s2) {
      return "green";
    } else if (s1 < s2) {
      return "red";
    } else {
      return "blue"
    }

  }


  scoreResult(s1: number, s2: number) {
    if (s1 > s2) {
      return " Wins";
    } else if (s1 < s2) {
      return " Looses";
    } else {
      return "Draw"
    }

  }


  deleteMatch(id: number) {
    //ancienne méthode avec LS:

    // this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // for (let i = 0; i < this.matchesTab.length; i++) {
    //   if (this.matchesTab[i].id === id) {
    //     this.matchesTab.splice(i, 1);
    //     break;
    //   }
    // }

    // localStorage.setItem("matches", JSON.stringify(this.matchesTab));

    //methode avec appel du service et req vers BE:
    this.mService.deleteMatchById(id).subscribe(
      (response)=> {
        console.log("la reponse  apres suppression d'un match est :" , response);
        //apres suppression retourner le tableau sans l'objet supprimé
        this.mService.getAllMatches().subscribe(
          (data)=>{  console.log("here is response from BE :" ,data);
            this.matchesTab=data.T;
          }
        );
      }
     );  


  }


  goToInfo(id: number) {
    //this.router.navigate(['matchInfo/' +id]) autre methode
    this.router.navigate([`match-info/${id}`]);//l'id est une variable pour ne pas etre lu comme chaine 
    //entre '' du path on utilise``POUR AFFICHER SON CONTENU
  }


  goToEdit(id: number) {
    this.router.navigate([`edit-match/${id}`]);
  }

}
