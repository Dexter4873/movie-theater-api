import { Column, Entity, ManyToOne } from 'typeorm';
import { GenericEntity } from '../../common/generic/generic-entity.entity';
import { Booker } from '../../bookers/entities/booker.entity';
import { Schedule } from '../../auditorium/entities/schedule.entity';

@Entity()
export class Booking extends GenericEntity {
  @Column({
    type: 'int',
    nullable: false,
  })
  seatNumber: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @ManyToOne(() => Booker)
  booker: Booker;

  @ManyToOne(() => Schedule)
  schedule: Schedule;
}
