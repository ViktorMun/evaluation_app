import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,  } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import { MinLength, IsEmail, IsString, IsBoolean, IsDate } from 'class-validator'
import * as bcrypt from 'bcrypt'


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

  @IsString()
  @Column('text', {nullable: false})
  colour: string;

  @IsString()
  @Column('text', { nullable: true})
  date: Date;

  @IsString()
  @Column('text', { nullable: true})
  text: string

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

  @IsEmail()
    @Column('text')
    email: string

    @IsString()
    @MinLength(6)
    @Column('text')
    @Exclude({ toPlainOnly: true })
  password: string


  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
}

checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}
