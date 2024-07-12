import { GenericEntity } from '../../common/generic/generic-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Auditorium } from './auditorium.entity';

@Entity()
export class Schedule extends GenericEntity {
  @Column({
    type: 'time',
    nullable: false,
  })
  time: string;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.schedules)
  auditorium: Auditorium;
}
