import { Contact } from './entities/contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { Repository } from 'typeorm';
export declare class ContactService {
    private contactRepo;
    constructor(contactRepo: Repository<Contact>);
    create(createContactDto: CreateContactDto): Promise<CreateContactDto & Contact>;
    findAll(): Promise<Contact[]>;
    findOne(): Promise<Contact>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<Contact[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
