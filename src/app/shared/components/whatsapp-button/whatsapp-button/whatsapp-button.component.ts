import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
})
export class WhatsappButtonComponent {
  phoneNumber = '918447868181'; // country code + number, no + or spaces
  message = '\*Hi ARUVA!\* I\'d love to know more about your jewellery collection. Could you help me out?';

  get whatsappLink(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
  }
}