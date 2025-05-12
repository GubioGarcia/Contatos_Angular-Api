import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Grupo } from '../../../models/grupo';
import { GrupoService } from '../../../service/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grupo-edit',
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
  templateUrl: './grupo-edit.component.html',
  styleUrl: './grupo-edit.component.css'
})
export class GrupoEditComponent {
  grupoSelecionado?: Grupo;
  errorMessage: string = '';

  constructor(
    private grupoService: GrupoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.grupoService.getGrupoById(+id).subscribe({
        next: (grupo) => this.grupoSelecionado = grupo,
        error: () => this.router.navigate(['/listarGrupos'])
      });
    }
  }

  updateGrupo() {
    if (this.grupoSelecionado) {
      const { nome } = this.grupoSelecionado;

      if (!nome?.trim()) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha o campo.' });
        return;
      }

      this.grupoService.save(this.grupoSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Grupo atualizado.' });
          this.router.navigate(['/listarGrupos']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao atualizar o grupo';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.errorMessage });
        }
      });
    }
  }
}
