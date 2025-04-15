import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../service/contact.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { response } from 'express';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DialogModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  contatos: Contact[] = [];

  displayDialogView: boolean = false;

  displayErrorDialog: boolean = false;
  contatoSelecionado?: Contact;

  constructor(private contactService: ContactService) {}

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
    this.contactService.delete(id).subscribe(() => {
      this.contactService.findAll().subscribe((response: Contact[]) => {
        this.contatos = response;
      });
    });
    this.displayDialogView = false;
  }
}
