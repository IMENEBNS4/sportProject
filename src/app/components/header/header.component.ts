import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user!:any;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

isLoggedIn(){
  let  token=sessionStorage.getItem("token");
  if (token){
   this.user=jwtDecode(token);
   console.log(this.user);
   
  }
  return !!token // pour avoir un retour boolean true si token=chaine /false si token null
}

logout(){
  sessionStorage.removeItem("token");
  this.route.navigate(['/']);
}

}
