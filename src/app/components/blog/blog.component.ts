import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    blogsTab:any=[
      {title:"bbbb",description:"bbbb",date:"10/09/1990"},
      {title:"kkkk",description:"kkkk",date:"10/09/1990"}
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
