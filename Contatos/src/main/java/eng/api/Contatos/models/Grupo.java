package eng.api.Contatos.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "grupo")
public class Grupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @OneToMany(mappedBy = "grupo")
    private List<Contact> contatos;

    public Grupo() {}

    public Grupo(Long id, String nome, List<Contact> contatos) {
        this.id = id;
        this.nome = nome;
        this.contatos = contatos;
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

    public List<Contact> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contact> contatos) {
        this.contatos = contatos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Grupo grupo = (Grupo) o;
        return Objects.equals(id, grupo.id) && Objects.equals(nome, grupo.nome) && Objects.equals(contatos, grupo.contatos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, contatos);
    }

    @Override
    public String toString() {
        return "Grupo{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", contatos=" + contatos +
                '}';
    }
}
