import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, FooterComponent, MenuComponent]
})
export class SharedModule { }
