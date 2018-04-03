import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,  } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsBoolean, IsDate } from 'class-validator'


@Entity()
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @Column('text', { nullable: false })
  name: string;

  @IsString()
  @Column('date', { nullable: false })
  start: Date;

  @IsString()
  @Column('date', { nullable: false })
  end: Date

  @OneToMany(_ => Student, student => student.group, {eager: true})
  student: Student[]

}

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @Column('text', { nullable: false })
  name: string;

  @IsString()
  @Column('text', {nullable: true})
  picture: string;


  @ManyToOne(_ => Group, group => group.student,{onDelete: "CASCADE"})
  group: Group

  @OneToMany(_ => Day, day => day.student, {eager: true})
  day: Day[]

}


@Entity()
export class Day extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsBoolean()
  @Column('text', {nullable: true})
  colour: string;

  @IsDate()
  @Column('date', { nullable: true})
  date: Date;

  @ManyToOne(_ => Student, student => student.day,{onDelete: "CASCADE"})
  student: Student

}

@Entity()
export class Teacher extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @Column('text', { nullable: false })
  name: string;

}
