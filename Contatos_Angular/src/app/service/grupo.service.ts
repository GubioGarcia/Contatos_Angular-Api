import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  url: string = "http://localhost:8080/grupos";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}`);
  }

  getGrupoById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.url}/${id}`);
  }

  save(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.url, grupo);
  }

  update(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.url}/${grupo.id}`, grupo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
