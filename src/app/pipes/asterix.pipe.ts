import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix' //sert lors de l'appel du pipe
})
export class AsterixPipe implements PipeTransform {


  //changer les voyelles d'une chaine par des étoiles:
  transform(ch: string) {

    let nouvelleCh = "";
    let v = ["a", "e", "i", "o", "y", "u", "A", "E", "U", "O", "I", "Y"]

    for (let i = 0; i < ch.length; i++) {
      let estVoyelle = false;
      for (let j = 0; j < v.length; j++)
        if (ch[i] == v[j]) {
          estVoyelle = true;
          break;
        }
      // if (estVoyelle) {
      //   nouvelleCh = nouvelleCh + "*";
      // }
      // else {
      //   nouvelleCh = nouvelleCh + ch[i]
      // }
      nouvelleCh += estVoyelle ? "*" : ch[i];
    }
    return nouvelleCh;
  }


  //   let result: string = "";
  //   let v = ["a", "e", "i", "o", "y", "u", "A", "E", "U", "O", "I", "Y"]

  //   for (let i = 0; i < ch.length; i++) {
  //     let inter = ch[i];
  //     for (let j = 0; j < v.length; j++) {
  //       if (inter == v[j]) {
  //         inter = "*"
  //         break;
  //       }
  //     }
  //     result += inter;
  //   }
  //   return result
  // }
}