import { Component, OnInit, Renderer2 } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    MenubarModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.items = [
        {
          label: 'Home',
          icon: 'pi pi-user',
          routerLink: ['/home']
        },
        {
          label: 'Lista de contatos',
          icon: 'pi pi-user',
          routerLink: ['/listarContatos']
        },
        {
            label: 'Adicionar contato',
            icon: 'pi pi-user',
            routerLink: ['/adicionarContato']
        }
    ];
  }
}
