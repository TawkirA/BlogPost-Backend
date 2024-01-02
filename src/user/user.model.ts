import { Column, CreatedAt, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    @ApiProperty()
    id: number;

    @Column({
        allowNull: false
    })
    @ApiProperty()
    public name: string;

    @Column({
        allowNull: false,
        unique: true
    })
    @ApiProperty()
    public email: string;

    @Column({
        allowNull: false,        
    })
    @ApiProperty()
    password: string;

    @CreatedAt 
    @ApiProperty()
    public createdAt: Date
}