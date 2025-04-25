import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 this is the key import
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { ModalLayoutComponent } from './modal-layout/modal-layout.component';



@NgModule({
  declarations: [ConnectWalletComponent, ModalLayoutComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ConnectWalletComponent]
})
export class SharedModule { }
