import { Component, OnInit, Input } from '@angular/core';
import {close_modal} from '../../../utils/helper';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss']
})
export class ModalLayoutComponent implements OnInit {
  @Input() id: string = '';
  @Input() width: string = '600px';
  @Input() customClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }


   onBackdropClick(event: MouseEvent) {
      if (event.target === event.currentTarget) {
        // clicked on backdrop only
        close_modal('wallet');
    }
  }

}
