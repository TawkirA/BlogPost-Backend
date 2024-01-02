import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';


@Table
export class BlogPost extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    @ApiProperty()
    public id: number;

    @Column({
        allowNull: false
    })
    @ApiProperty()
    title: string;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    @ApiProperty()
    description: string;

    @Column({
        allowNull: true
    })
    @ApiProperty()
    tags: string;

    @Column({
        allowNull: false
    })
    @ApiProperty()
    createdBy: string

    @CreatedAt 
    @ApiProperty()
    public createdAt: Date
       
}