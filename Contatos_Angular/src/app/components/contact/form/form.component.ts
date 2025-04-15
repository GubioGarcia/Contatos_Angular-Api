import { Component } from '@angular/core';
import { ContactService } from '../../../service/contact.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  nome = '';
  email = '';
  telefone = '';

  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  constructor(private contactService: ContactService) {}

  addContact() {
    if (!this.nome || this.nome.trim() === '') {
      this.exibirMensagem('Nome não pode estar vazio.', 'erro');
      return;
    }
    if (!this.email || this.email.trim() === '') {
      this.exibirMensagem('E-mail é obrigatório.', 'erro');
      return;
    }
    if (!this.telefone || this.telefone.trim() === '') {
      this.exibirMensagem('Telefone é obrigatório.', 'erro');
      return;
    }

    const newContact = new Contact(this.nome, this.email, this.telefone);

    this.contactService.save(newContact).subscribe({
      next: () => {
        this.exibirMensagem('Contato adicionado!', 'sucesso');
        this.limparFormulario();
      },
      error: () => {
        this.exibirMensagem('Erro ao adicionar o contato.', 'erro');
      }
    });

    this.exibirMensagem('Contato adicionado!', 'sucesso');
    this.limparFormulario();
  }

  exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 3000);
  }

  limparFormulario() {
    this.nome = '';
    this.email = '';
    this.telefone = '';
  }
}
