import { GenericEntity } from '../../common/generic/generic-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Auditorium } from './auditorium.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Schedule extends GenericEntity {
  @Column({
    type: 'time',
    nullable: false,
  })
  time: string;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.schedules)
  auditorium: Auditorium;

  @OneToMany(() => Booking, (booking) => booking.schedule)
  bookings: Booking[];
}
