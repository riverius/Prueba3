import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  username = '';
  title = 'Panel de Profesor';

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    const user = await this.authService.getUser();
    console.log(user); // Agrega esta línea para depurar
    if (user) {
      this.username = `${user.first_name} ${user.last_name}`;
      console.log(this.username); // Agrega esta línea para depurar
    }
  }
}