import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { JewelType } from '../../../core/models/product.model';

@Component({
  selector: 'app-jewel-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jewel-visual.component.html',
})
export class JewelVisualComponent {
  @Input() type: JewelType = 'earring';
  @Input() shade: 'light' | 'medium' | 'dark' = 'light';
}
