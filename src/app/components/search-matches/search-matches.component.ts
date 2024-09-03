import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {
  searchMatch: any = {}; //objet ou on va recuperer les scores one et two
  searchForm !: FormGroup;
  matchesTab: any = [];
  searchedMatches: any = [];
  elt: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.searchedMatches = [] // pour que a chaque recherche l'affichage ne prend pas la derniere recherche et ajour avec elle le nouveau resultat
    this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // for (let i = 0; i < this.matchesTab.length; i++) {
    //   if (this.matchesTab[i].scoreOne == this.searchMatch.scoreOne && this.matchesTab[i].scoreTwo == this.searchMatch.scoreTwo) {
    //     this.searchMatch = this.matchesTab[i];
    //     this.searchedMatches.push(this.searchMatch);
    //   }
    // }
    this.searchedMatches = this.matchesTab.filter((elt: any) => //elt element du tableau matchesTab contient des objets
     elt.scoreOne == this.searchMatch.scoreOne //searchMatch contient les inputs recherchées
      &&
    elt.scoreTwo == this.searchMatch.scoreTwo)

  }


}
