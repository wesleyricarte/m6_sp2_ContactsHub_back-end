import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import { User } from '.';

@Entity('contacts')
export class Contact {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 45 })
	name: string;

	@Column({ type: 'varchar', length: 45, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 11, unique: true })
	phone: string;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@ManyToOne(() => User, (user) => user.contacts)
	@JoinColumn()
	user: User;
}
