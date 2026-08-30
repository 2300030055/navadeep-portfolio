package com.navadeep.portfolio.service;

import com.navadeep.portfolio.dto.ContactRequest;
import com.navadeep.portfolio.entity.ContactMessage;
import com.navadeep.portfolio.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public ContactMessage saveContactMessage(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(sanitize(request.getName()));
        message.setEmail(sanitize(request.getEmail()));
        message.setMessage(sanitize(request.getMessage()));
        return contactRepository.save(message);
    }

    private String sanitize(String input) {
        if (input == null) return null;
        return input.trim();
    }
}
