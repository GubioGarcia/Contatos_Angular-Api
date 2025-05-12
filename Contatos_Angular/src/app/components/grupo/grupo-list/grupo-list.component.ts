import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from '../../../service/grupo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-grupo-list',
  imports: [
    CommonModule, ButtonModule, FormsModule, DialogModule, TableModule,
    ToastModule, ConfirmDialogModule, RouterModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './grupo-list.component.html',
  styleUrl: './grupo-list.component.css'
})
export class GrupoListComponent implements OnInit {
  grupos: Grupo[] = [];
  displayDialogView: boolean = false;
  displayDialogEdit: boolean = false;
  displayErrorDialog: boolean = false;
  grupoSelecionado?: Grupo;
  errorMessage: string = '';

  constructor(private grupoService: GrupoService, private router: Router, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.grupoService.findAll().subscribe((response: Grupo[]) => {
      this.grupos = response;
    })
  }

  carregarGrupos() {
    this.grupoService.findAll().subscribe(data => this.grupos = data);
  }

  editar(grupo: Grupo) {
    if (grupo.id !== undefined) {
      this.router.navigate(['/grupos/edit', grupo.id]);
    }
  }

  deleteGrupo(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir este grupo?',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.grupoService.delete(id).subscribe({
          next: () => {
            this.grupoService.findAll().subscribe((response: Grupo[]) => {
              this.grupos = response;
            });
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'Erro ao excluir o grupo.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.errorMessage });
          }
        });
        this.displayDialogView = false;
      }
    });
  }
}
