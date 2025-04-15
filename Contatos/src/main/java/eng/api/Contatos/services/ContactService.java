package eng.api.Contatos.services;

import eng.api.Contatos.models.Contact;
import eng.api.Contatos.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll() {
        return this.contactRepository.findAll();
    }

    public Contact findById(Long id) {
        return this.contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Contato não encontraddo"));
    }

    public Contact save(Contact contact) {
        return this.contactRepository.save(contact);
    }

    public Contact update(Contact contact) {
        return this.contactRepository.save(contact);
    }

    public void delete(Long id) {
        this.contactRepository.deleteById(id);
    }
}
