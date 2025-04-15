import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contact_list: Contact[] = [];
  url: string = "http://localhost:8080/contato";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}`);
  }

  save(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
