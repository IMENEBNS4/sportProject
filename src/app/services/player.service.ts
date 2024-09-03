import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerURL: string = "http://localhost:3000/players"


  constructor(private httpClient: HttpClient) { }

  addPlayer(obj: any) {
    return this.httpClient.post<{msg:String}>(this.playerURL, obj);
  }

  editPlayer(obj: any) {
    return this.httpClient.put<{msg:String}>(this.playerURL, obj);
  }

 getAllPlayers() {
    return this.httpClient.get<{players:any}>(this.playerURL);
  }

  getPlayerById(id: any) {
    return this.httpClient.get<{data:any}>(`${this.playerURL}/${id}`);
  }

 deletePlayerById(id: any) {
    return this.httpClient.delete<{msg:String}>(`${this.playerURL}/${id}`);
  }




}
