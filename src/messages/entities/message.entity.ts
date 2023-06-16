import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// @Entity({ name: 'message' })
@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    author: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false, default: 'main'})
    to: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updated_at: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    created_at: Date;
}
