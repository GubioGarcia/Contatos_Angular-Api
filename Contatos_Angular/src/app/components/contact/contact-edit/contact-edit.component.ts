import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../../service/contact.service';
import { Contact } from '../../../models/contact';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact-edit',
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  contatoSelecionado?: Contact;
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getById(+id).subscribe({
        next: (contato) => this.contatoSelecionado = contato,
        error: () => this.router.navigate(['/listarContatos'])
      });
    }
  }

  updateContato() {
    if (this.contatoSelecionado) {
      const { nome, email, telefone } = this.contatoSelecionado;

      if (!nome?.trim() || !email?.trim() || !telefone?.trim()) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos.' });
        return;
      }

      this.contactService.save(this.contatoSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato atualizado.' });
          this.router.navigate(['/listarContatos']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar o contato';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.errorMessage });
        }
      });
    }
  }
}
