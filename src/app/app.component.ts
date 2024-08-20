import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toDoList';

  public closeAlert() {
    const toastLiveExample = document.getElementById('alertPart');
    toastLiveExample?.classList.remove("show");
    toastLiveExample?.classList.add("hide");
  }
}
