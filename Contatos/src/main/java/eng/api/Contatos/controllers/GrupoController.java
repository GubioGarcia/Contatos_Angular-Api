package eng.api.Contatos.controllers;

import eng.api.Contatos.models.Contact;
import eng.api.Contatos.models.Grupo;
import eng.api.Contatos.services.GrupoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("grupos")
@CrossOrigin(origins = "http://localhost:4200")
public class GrupoController {
    @Autowired
    private GrupoService grupoService;

    @GetMapping
    public List<Grupo> findAll() {
        return this.grupoService.findAll();
    }

    @GetMapping("/{id}")
    public Grupo findById(@PathVariable Long id) {
        return this.grupoService.findById(id);
    }

    @PostMapping
    public Grupo saveGrupo(@RequestBody Grupo grupo) {
        return this.grupoService.save(grupo);
    }

    @PutMapping("/{id}")
    public Grupo updateGrupo(@PathVariable Long id, @RequestBody Grupo grupo) {
        grupo.setId(id);
        return this.grupoService.save(grupo);
    }

    @DeleteMapping("/{id}")
    public void deleteGrupo(@PathVariable Long id) {
        this.grupoService.delete(id);
    }
}
