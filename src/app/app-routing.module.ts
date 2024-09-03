import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllMatchesComponent } from './components/all-matches/all-matches.component';
import { ResultComponent } from './components/result/result.component';
import { PlayersComponent } from './components/players/players.component';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { SearchPlayersComponent } from './components/search-players/search-players.component';


const routes: Routes = [
  //si on met http://localhost:4200/
//HomeComponent will be displayed
{path:'',component:HomeComponent},

  //si on met http://localhost:4200/signup
//signupComponent will be displayed
{path:'signup',component:SignupComponent},

//si on met http://localhost:4200/signupAdmin
//signupComponent will be displayed
{path:'signupAdmin',component:SignupComponent},

  //si on met http://localhost:4200/login
//LoginComponent will be displayed
{path:'login',component:LoginComponent},

//si on met http://localhost:4200/addPlayer
//AddPlayerComponent will be displayed
{path:'addPlayer',component:AddPlayerComponent},

//si on met http://localhost:4200/add-match
//AddMatchComponent will be displayed
{path:'add-match',component:AddMatchComponent},

 //si on met http://localhost:4200/add-Team
//addTeamComponent will be displayed
{path:'add-team',component:AddTeamComponent},

 //si on met http://localhost:4200/admin
//adminComponent will be displayed
{path:'admin',component:AdminComponent},


 //si on met http://localhost:4200/all-matches
//all-matchesComponent will be displayed
{path:'all-matches',component:AllMatchesComponent},

 //si on met http://localhost:4200/result
//resultComponent will be displayed
{path:'result',component:ResultComponent},

 //si on met http://localhost:4200/palyers
//playersComponent will be displayed
{path:'players',component:PlayersComponent},

 //si on met http://localhost:4200/search
//searchComponent will be displayed
{path:'search',component:SearchMatchesComponent},

 //si on met http://localhost:4200/match-info
//searchComponent will be displayed
{path:'match-info/:id',component:MatchInfoComponent},    //path parametré car id change tjrs

 //si on met http://localhost:4200/edit-match/:id
//searchComponent will be displayed
{path:'edit-match/:id',component:EditMatchComponent},    //path parametré car id change tjrs

 //si on met http://localhost:4200/team-info/:id
//TEAMINFO will be displayed
{path:'team-info/:id',component:TeamInfoComponent}, 

 //si on met http://localhost:4200/search-players
//TEAMINFO will be displayed
{path:'search-players',component:SearchPlayersComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
