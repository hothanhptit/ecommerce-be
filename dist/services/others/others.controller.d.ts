import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './dto/menu.dto';
import { OthersService } from './others.service';
export declare class OthersController {
    private readonly othersService;
    constructor(othersService: OthersService);
    create(menuDto: Menu): Promise<Menu>;
    findAll(): Promise<Menu[] | import("@nestjs/common").NotFoundException>;
    findOne(id: string): Promise<Menu>;
    update(id: string, menuDto: UpdateMenuDto): Promise<{
        id: number;
        name: string;
        jsonMenu: string;
    } & Menu>;
    remove(id: string): Promise<boolean>;
}
