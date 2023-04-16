import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './dto/menu.dto';
import { Repository } from 'typeorm';
export declare class OthersService {
    private menuRepo;
    constructor(menuRepo: Repository<Menu>);
    create(menuDto: Menu): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findOne(id: number): Promise<Menu>;
    update(id: number, menuDto: UpdateMenuDto): Promise<{
        id: number;
        name: string;
        jsonMenu: string;
    } & Menu>;
    remove(id: number): Promise<boolean>;
}
