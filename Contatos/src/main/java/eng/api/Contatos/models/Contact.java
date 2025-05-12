package eng.api.Contatos.models;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "nome", nullable = false, length = 100)
    public String nome;

    @Column(name = "email", nullable = false, length = 50)
    public String email;

    @Column(name = "Telefone", nullable = false, length = 13)
    public String telefone;

    @Column(name = "Favorito", nullable = false)
    public Boolean favorito = false;

    @ManyToOne
    @JoinColumn(name = "grupo_id")
    private Grupo grupo;

    public Contact() {}

    public Contact(Long id, String nome, String email, String telefone, Boolean favorito) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.favorito = favorito;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Boolean getFavorito() {
        return favorito;
    }

    public void setFavorito(Boolean favorito) {
        this.favorito = favorito;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return Objects.equals(id, contact.id) && Objects.equals(nome, contact.nome) && Objects.equals(email, contact.email) && Objects.equals(telefone, contact.telefone) && Objects.equals(favorito, contact.favorito);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, email, telefone, favorito);
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", telefone='" + telefone + '\'' +
                ", favorito=" + favorito +
                '}';
    }
}
