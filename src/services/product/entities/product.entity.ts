import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToMany, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: String

    @UpdateDateColumn()
    updtedAt: String
}
