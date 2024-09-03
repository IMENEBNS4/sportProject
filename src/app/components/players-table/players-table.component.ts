import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  playersTab: any = []



  display(id: number, msg: string) {
    alert("Player N° :" + id + " " + msg);
  }


  constructor(private pService: PlayerService) { }

  ngOnInit(): void {
    this.pService.getAllPlayers().subscribe(
      (response) => {
        console.log("la reponse est ....", response);
        this.playersTab = response.players;

      }
    );
  }

}
