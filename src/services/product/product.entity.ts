import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToMany, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @ApiProperty({ example: "name", description: 'name' })
    @Column()
    name: string

    @CreateDateColumn()
    createdAt: String

    @UpdateDateColumn()
    updtedAt: String
}
