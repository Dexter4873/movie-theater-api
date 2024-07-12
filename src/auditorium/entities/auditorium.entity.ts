import { GenericEntity } from '../../common/generic/generic-entity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Auditorium extends GenericEntity {
  @Column({
    type: 'text',
    nullable: false
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  seats: number;

  @OneToMany(() => Schedule, (schedule) => schedule.auditorium)
  schedules: Schedule[]
}
