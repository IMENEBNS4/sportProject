import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm !: FormGroup; //déclarer l'id du formulaire
  user: any = {};
  path!: string;
  errorMsg ! : string;
  photo : any;

  constructor(private formBuilder: FormBuilder, // déclarer une instance formBuilder de type FormBuilder (type responsable de création des input)
    private sService: UserService,
    private router: Router,
  ) { }




  ngOnInit() { // premiére methode qui se traite lors de  l'appel avec un selector / lors d'un reload
    this.signupForm = this.formBuilder.group({        //pour regrouper les attribut à déclarer et l'affecter à l'id du form
      firstName: ['', [Validators.required, Validators.minLength(3)]],  // valeur initiale chaine vide +[VALIDATEURS]
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      confPwd: ['']



    }
    )
    this.path = this.router.url;//path contient la partie de l'url sauf l'url de base
    console.log("here path : ", this.path);

  }
  signup() {//this.signupForm.value EST NOTRE OBJET
    console.log("Here is user object,", this.signupForm.value,this.photo); //afficher en log tout l'objet en lui ajoutant le fichier uploded
    //redirection d'admin et client:
    if (this.path == "/signupAdmin") {
      this.signupForm.value.role = 'admin';
    } else {
      this.signupForm.value.role = 'client';
    }
    this.sService.signup(this.signupForm.value,this.photo).subscribe( //reponse dans respone soir is  saved soit msg
      (response) => {
        console.log('le nouveau user est :', response);
        //si issaved === email n'exite pas avant et user enregistré alors on redirige vers login
        if (response.isSaved==true) {
          this.router.navigate(['/login'])
        } else {
          this.errorMsg=response.msg;
        }
      }
    );
  }

  selectFile(event:any) {
    const inputElement =event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length>0) {
      this.photo = inputElement.files [0];
    } 

  }

}
