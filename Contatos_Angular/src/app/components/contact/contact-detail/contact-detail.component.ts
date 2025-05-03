import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Contact } from '../../../models/contact';
import { EventEmitter } from '@angular/core';
import { ContactService } from '../../../service/contact.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-detail',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contatoSelecionado?: Contact;
  @Input() displayDialogView: boolean = false;
  @Output() displayDialogViewChange = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(private contactService: ContactService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

  fecharDialog() {
    this.displayDialogView = false;
    this.displayDialogViewChange.emit(false);
    this.closeDialog.emit();
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
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Contato excluído com sucesso.'
            });
            this.fecharDialog();
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'Erro ao excluir o contato.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.errorMessage });
          }
        });
      }
    });
  }
}
