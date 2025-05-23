import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../service/contact.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule, ButtonModule, FormsModule, DialogModule, TableModule,
    ToastModule, ConfirmDialogModule, ContactDetailComponent, RouterModule
  ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  contatos: Contact[] = [];
  displayDialogView: boolean = false;
  displayDialogEdit: boolean = false;
  displayErrorDialog: boolean = false;
  contatoSelecionado?: Contact;
  errorMessage: string = '';

  constructor(private contactService: ContactService, private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.contactService.findAll().subscribe((response: Contact[]) => {
      this.contatos = response;
    })
  }

  viewContact(contact: Contact) {
    this.contatoSelecionado = contact;
    this.displayDialogView = true;
  }

  deleteContact(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir este contato?',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.contactService.delete(id).subscribe({
          next: () => {
            this.contactService.findAll().subscribe((response: Contact[]) => {
              this.contatos = response;
            });
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'Erro ao excluir o contato.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.errorMessage });
          }
        });
        this.displayDialogView = false;
      }
    });
  }

  onCloseDialog() {
    this.contatoSelecionado = undefined;
    this.contactService.findAll().subscribe((response: Contact[]) => {
      this.contatos = response;
    });
  }

  alternarFavorito(contato: Contact) {
    contato.favorito = !contato.favorito;
    this.contactService.update(contato).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: contato.favorito ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o favorito.'
        });
        contato.favorito = !contato.favorito;
      }
    });
  }
}
