
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  //adresse de destination=adresse du serveur BE
  matchUrl: string = "http://localhost:3000/matches"

  constructor(private httpClient: HttpClient) { } //httpClient est le livreur de aramex
  //les requetes === les methodes:

  // requete pour récupérer tous les objets
  // réponse : tableau d'objet
  getAllMatches() { //appelée par matchestable component
    return this.httpClient.get <{T:any}>(this.matchUrl);  // http client va apporter de l'addresse 3000
  }

  // requete pour récupérer un match a partir de son id 
  // réponse : un objet
  getMatchById(id: any) {
    //matchUrl et id sont des parametres c pk ${} Et `` car get demande une chaine
    return this.httpClient.get<{match:any}>(`${this.matchUrl}/${id}`);
  }

  // requete pour supprimer un match a partir de son id 
  // réponse :boolean : true/false , string : success/echec deleted/notDeleted
  deleteMatchById(id: any) {
    return this.httpClient.delete <{ isDeleted: true } >(`${this.matchUrl}/${id}`);
  }

  // requete pour ajouter un match 
  // réponse :boolean : true/false , string : success/echec added/not added
  addMatch(matchObj: any) {//objet récupéré du form en parametre
    return this.httpClient.post<{isAdded:boolean}>(this.matchUrl, matchObj); //post demande url + objet à poster/ envoyer
  }

  // requete pour modifier un match 
  // réponse :boolean : true/false , string : success/echec edited/not edited
  editMatch(newMatch:any) {
    return this.httpClient.put<{msg: String}>(this.matchUrl,newMatch); //put prend l'url + l'objet à modifier
  }
}
