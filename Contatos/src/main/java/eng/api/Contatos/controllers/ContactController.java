package eng.api.Contatos.controllers;

import eng.api.Contatos.models.Contact;
import eng.api.Contatos.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contato")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping()
    public List<Contact> findAll() {
        return this.contactService.findAll();
    }

    @GetMapping("/{id}")
    public Contact findById(@PathVariable Long id) {
        return this.contactService.findById(id);
    }

    @PostMapping
    public Contact saveContact(@RequestBody Contact contact) {
        return this.contactService.save(contact);
    }

    @PutMapping
    public Contact updateContact(@RequestBody Contact contact) {
        return this.contactService.update(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteMedico(@PathVariable Long id) {
        this.contactService.delete(id);
    }
}
