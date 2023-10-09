import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identificator: string;
}
