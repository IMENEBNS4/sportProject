import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  user: any = {};
   errorMsg !: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  
  
  }

  login() {
    console.log("here object", this.user);
    this.userService.login(this.user).subscribe( //data est la reponse
      (data) => {//data.user retour du BE versFE === chaine encodée
        console.log("here data after login:" ,data.msg);
        console.log("here data after login:" ,data.user);
        //user exist and success login
        if (data.user) {  //data.user est le retour == user connecté correctement
          let decoded: any =jwtDecode(data.user)// objet retourné décodé ==>obj initial
          sessionStorage.setItem("token",data.user)//garder le retour encodé=token qu'on peut la décoder jwt
          console.log("here decoded object" ,decoded) //decoded conteint id fn ln role
        if (decoded.role=='admin') {
          this.router.navigate(['admin']); 
        }
        else {//client
          this.router.navigate(['/']);
        }
          
      } else {//user does not exist
        this.errorMsg =data.msg;
      }
      }
    );
  }

}
