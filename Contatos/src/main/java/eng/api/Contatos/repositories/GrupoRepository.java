package eng.api.Contatos.repositories;

import eng.api.Contatos.models.Contact;
import eng.api.Contatos.models.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long> {
}
