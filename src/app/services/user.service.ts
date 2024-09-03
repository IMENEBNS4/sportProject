import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //adresse de destination=adresse du serveur BE
  userUrl: string = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }

  //user : firstname,lastname,email,pwd,tel,role
  signup(user: any, photo:File) {
    let fData=new FormData;//couffin qui reeuinit user et photo
    fData.append("firstName",user.firstName)
    fData.append("lastName",user.lastName)
    fData.append("email",user.email)
    fData.append("pwd",user.pwd)
    fData.append("role",user.role)
    fData.append("img",photo)
    return this.httpClient.post<{ msg: string, isSaved: boolean }>(this.userUrl, fData)
  }
  //login et signup ayant 2 req post + meme url on ajoute un path à login pour differencier les 2 adresses
  //user :email,pwd
  login(user: any) {
    return this.httpClient.post<{ msg: string, user: any }>(this.userUrl + "/login", user);
  }




}
