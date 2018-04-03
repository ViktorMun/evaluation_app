import {
  Authorized,
  JsonController,
  Param,
  BadRequestError,
  NotFoundError,
  Get,
  Body,
  Patch,
  Delete,
  HttpCode,
  Post,
  HeaderParam
} from 'routing-controllers'
import { Teacher, Group, Student, Day } from './entities'
import { Validate } from 'class-validator'
import * as request from 'superagent'


@JsonController()
export default class evaluationController {

  @Authorized()
  @Get('/groups')
  @HttpCode(200)
  getGroups() {
    return Group.find()
  }

  @Authorized()
  @Get('/groups/:id([0-9]+)')
  @HttpCode(200)
  getGroup(
    @Param('id') groupId: number
  ) {
    return Group.findOneById(groupId)
  }


  //
  // POST when new group
  //
  @Authorized()
  @Post("/groups")
  @HttpCode(201)
  async create(
    @Body() group: Group
  ) {

    const entityGroup = await Group.create({
      name: group.name,
      start: group.start,
      end: group.end
    }).save();

    for (let i = 0; i < group.student.length; i++) {
      const entityStudent = await Student.create({
        group: entityGroup,
        name: group.student[i].name,
        picture: group.student[i].picture
      }).save();

      for (let j = 0; j < group.student[i].day.length; j++) {
        await Day.create({
          student: entityStudent,
          colour: group.student[i].day[j].colour,
          date: group.student[i].day[j].date
        }).save();
      }
    }
  }

  @Authorized()
  @Patch('/groups')
  @HttpCode(201)
  async updateGroup(
    @Body() updates: Group
  ) {
    const group = await Group.findOneById(updates.id)
    if (!group) throw new NotFoundError(`Group does not exist!`)
    await Group.merge(group, updates).save()

    const allStudents = await Promise.all(updates.student.map(async student => {
      if (student.id === undefined) {
        const entity = await Student.create({
          group: group,
          name: student.name,
          picture: student.picture
        }).save()
        await student.day.map(async day => {
          await Day.create({
            student: entity,
            colour: day.colour,
            date: day.date
          }).save()
        })
      }
      else {
        let sStudent = await Student.findOneById(student.id)
        let studentMerge = await Student.merge(sStudent, student).save()
      }

      const alldays = await Promise.all(student.day.map(async day => {
        if (day.id === undefined) {
          await Day.create({
            student: student,
            colour: day.colour,
            date: day.date
          }).save()
        }
        else {
          let sStudent = await Day.findOneById(day.id)
          let studentMerge = await Student.merge(sStudent, day).save()
        }
      }))
    }))

    return {
      message: 'You successfully changed group'
    }
  }
  @Authorized()
  @Delete('/groups/:id([0-9]+)')
  @HttpCode(204)
  async deleteGroup(
    @Param('id') id: number,
  ) {
    const group = await Group.findOneById(id)
    if (!group) throw new NotFoundError(`Group does not exist!`)
    await group.remove()

    return {
      message: "You succesfully deleted group"
    }
  }

  @Authorized()
  @Delete('/students/:id([0-9]+)')
  @HttpCode(204)
  async deleteStudent(
    @Param('id') id: number,
  ) {
    const student = await Student.findOneById(id)
    if (!student) throw new NotFoundError(`Student does not exist!`)
    await student.remove()

    return {
      message: "You succesfully deleted student"
    }
  }

  @Authorized()
  @Post('/teachers')
  async signup(
    @Body() teacher: Teacher
  ) {
    const { password, ...rest } = teacher
    const entity = Teacher.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }


  @Authorized()
  @Delete('/teachers/:id([0-9]+)')
  async removeTeacher(
    @Param('id') id: number
  ) {
    const teacher = await Teacher.findOneById(id)
    if (!teacher) throw new NotFoundError('Cannot find teacher')
    teacher.remove()
    return "teacher succesfully deleted"
  }

}
