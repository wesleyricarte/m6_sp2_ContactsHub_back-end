import { getRounds, hashSync } from 'bcryptjs';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BeforeInsert,
	BeforeUpdate,
	OneToMany,
} from 'typeorm';
import { Contact } from '../entities';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 45 })
	name: string;

	@Column({ length: 45, unique: true })
	email: string;

	@Column({ default: false })
	admin: boolean;

	@Column({ length: 120 })
	password: string;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const isEncrypted = getRounds(this.password);
		if (!isEncrypted) this.password = hashSync(this.password, 10);
	}

	@OneToMany(() => Contact, (cont) => cont.user)
	contacts: Array<Contact>;
}
