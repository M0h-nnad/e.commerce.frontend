import { Component, OnInit } from '@angular/core';
import { faMapMarker,faPhone,faEnvelope,faFax } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faMapMarker=faMapMarker;
  faPhone=faPhone;
  faEnvelope=faEnvelope;
  faFax=faFax;
  constructor() { }

  ngOnInit(): void {
  }

}
