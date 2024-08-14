import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/types/toDoType';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  ngOnInit(): void {
    let ins: ToDo = {
      "title": "Einkaufen",
      "categorie": "Wichtig",
      "date": new Date(),
      "done_date": new Date(),
      "status": "offen",
      "description": "EInkaufen gehen bitte",
      "id": 1
    };
  }

}
