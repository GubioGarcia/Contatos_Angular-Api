import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from '../../../service/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-grupo-form',
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './grupo-form.component.html',
  styleUrl: './grupo-form.component.css'
})
export class GrupoFormComponent implements OnInit {
  nome = '';
  id?: number;
  isEdit = false;

  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  constructor(
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.grupoService.getGrupoById(+idParam).subscribe(grupo => {
        this.id = grupo.id;
        this.nome = grupo.nome;
      });
    }
  }

  salvarGrupo() {
    if (!this.nome || this.nome.trim() === '') {
      this.exibirMensagem('Nome do grupo é obrigatório.', 'erro');
      return;
    }

    const grupo: Grupo = {
      id: this.id,
      nome: this.nome.trim()
    };

    const request$ = this.isEdit
      ? this.grupoService.update(grupo)
      : this.grupoService.save(grupo);

    request$.subscribe({
      next: () => {
        this.exibirMensagem('Grupo salvo com sucesso!', 'sucesso');
        setTimeout(() => this.router.navigate(['/listarGrupos']), 1500);
      },
      error: () => this.exibirMensagem('Erro ao salvar o grupo.', 'erro')
    });
  }

  exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 3000);
  }
}
