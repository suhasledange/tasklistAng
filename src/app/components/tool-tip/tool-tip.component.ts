import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-tip.component.html',
  styleUrl: './tool-tip.component.css'
})
export class ToolTipComponent {
  @Input() visible = false;
  @Input() top = '0px';
  @Input() left = '0px';
  @Input() status="";
}
