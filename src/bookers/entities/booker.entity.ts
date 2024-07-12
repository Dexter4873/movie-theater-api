import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../../common/generic/generic-entity.entity';

@Entity()
export class Booker extends GenericEntity {
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  lastname: string;
}
