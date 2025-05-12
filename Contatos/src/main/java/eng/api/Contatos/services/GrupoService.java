package eng.api.Contatos.services;

import eng.api.Contatos.models.Grupo;
import eng.api.Contatos.repositories.GrupoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrupoService {

    @Autowired
    private GrupoRepository grupoRepository;

    public GrupoService(GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    public List<Grupo> findAll() {
        return this.grupoRepository.findAll();
    }

    public Grupo findById(Long id) {
        return this.grupoRepository.findById(id).orElseThrow(() -> new RuntimeException("Grupo não encontraddo"));
    }

    public Grupo save(Grupo grupo) {
        return this.grupoRepository.save(grupo);
    }

    public Grupo update(Grupo grupo) {
        return this.grupoRepository.save(grupo);
    }

    public void delete(Long id) {
        this.grupoRepository.deleteById(id);
    }
}
