import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-designation-security',
  templateUrl: './designation-security.component.html',
  styleUrls: ['./designation-security.component.css']
})
export class DesignationSecurityComponent implements OnInit {
  url: any;

  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.url= this.route.snapshot.url.toString();
    console.log(this.url);
  }

}
