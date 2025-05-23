package eng.api.Contatos.repositories;

import eng.api.Contatos.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByFavoritoTrue();
    List<Contact> findByGrupoId(Long grupoId);
}
