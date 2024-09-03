import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamURL: string = "http://localhost:3000/teams"

  constructor(private httpClient: HttpClient) { }


  addTeam(obj: any) {
    return this.httpClient.post<{ msg: String }> (this.teamURL, obj);
  }

  deleteTeam(id: any) {
    return this.httpClient.delete<{ isDeleted: true }>(`${this.teamURL}/${id}`);
  }

  getAllTeams() {
    return this.httpClient.get<{ teams: any }>(this.teamURL);
  }

  editTeam(id: any) {
    return this.httpClient.put<{ msg: String }>(this.teamURL, `${this.teamURL}/${id}`);
  }

  getTeamById(id: any) {
    return this.httpClient.get<{ data: any }>(`${this.teamURL}/${id}`);
  }








}
