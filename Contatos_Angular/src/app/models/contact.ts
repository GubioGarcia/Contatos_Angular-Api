export class Contact {
  public id?: number;
  public nome: string;
  public email: string;
  public telefone: string;

  constructor(nome: string, email: string, telefone: string) {
    if (this.id !== undefined) {
      this.id = this.id;
    }
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}
