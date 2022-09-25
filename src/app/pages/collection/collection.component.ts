import { Component, OnInit } from '@angular/core';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  isBrandOpen = true;
  isColorOpen = true;
  isSizeOpen = true;
  constructor() {}
  ngOnInit(): void {}
}
