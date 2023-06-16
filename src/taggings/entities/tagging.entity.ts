import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tagging extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stream_id: string;

    @Column()
    timestamp_from: string;

    @Column()
    timestamp_to: string;

    @Column({ nullable: false })
    author: string;

    @Column({ nullable: false })
    content: string;

    // @Column('timestamp', {
    //     nullable: false,
    //     default: () => 'CURRENT_TIMESTAMP',
    //     name: 'updated_at',
    // })
    // updated_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    created_at: Date;
}
