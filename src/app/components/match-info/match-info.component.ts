import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  matchID: any; //pour y mettre le contenu de activatedroute (qui est l'id recupéré du path)
  match: any = {};

  constructor(private activatedRoute: ActivatedRoute, private mService: MatchService) { }

  ngOnInit() {
    //récupérer l'id du path
    this.matchID = this.activatedRoute.snapshot.params['id'];//id meme mot ecrit dans path de match info
    console.log("this.matchID", this.matchID);

    //chercher l'id meme que l'id recupéré du path dans le tableau matches
    // let matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // for (let i = 0; i < matchesTab.length; i++) { //matchesTab variable dans une methode et pas un attribut
    //   if (this.matchID == matchesTab[i].id) {
    //     this.match = matchesTab[i];
    //     break;
    //   }
    // }


    //chercher l'objet par son id pour l'afficher:
    this.mService.getMatchById(this.matchID).subscribe(
      (data)=> {
        console.log("le match du BE est ",data)
        this.match=data.match;
      }
    );



  }


}
