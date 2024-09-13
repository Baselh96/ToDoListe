import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public static doSuccessAlert(message: string) {
    const alert = document.getElementById('alertPart');
    const alertIcon = document.getElementById('alertIcon');
    const alertText = document.getElementById('alertText');
    alert!.className = `alert fade position-fixed bottom-0 end-0 mb-3 mx-2 show alert-success`;
    alertIcon!.className = `bi mx-2 bi-check2-circle`;
    alertText!.innerText = message;
  }

  public static doInfoAlert(message: string) {
    const alert = document.getElementById('alertPart');
    const alertIcon = document.getElementById('alertIcon');
    const alertText = document.getElementById('alertText');
    alert!.className = `alert fade position-fixed bottom-0 end-0 mb-3 mx-2 show alert-primary`;
    alertIcon!.className = `bi mx-2 bi-info-circle-fill`;
    alertText!.innerText = message;
  }
}
