import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Todos', icon: 'pi pi-list' },
    { label: 'Settings', icon: 'pi pi-cog' }
  ];
  protected readonly title = signal('angular-todo-aggrid');
}
