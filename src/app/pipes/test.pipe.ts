import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {
 chInv: string = "";
    y :string="Hello";
  transform(ch: string) {
    //Méthode 1
    
   let chInv: string = "";
    // for (let i = ch.length-1; i >= 0; i--) {
    //   chInv = chInv + ch[i];
    // }
    // return chInv;

    //Méthode 2
  
    for (let i = 0; i < ch.length; i++) {
      {
        chInv = ch[i] + chInv;
      }
    }
    return chInv +" "+ this.y +" "+this.calcul(" ok");
  }


calcul(x:string){
  return x;
}
}