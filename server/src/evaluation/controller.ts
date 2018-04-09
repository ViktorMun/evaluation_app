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
import { progressBar, randomStudent } from './logic'


@JsonController()
export default class evaluationController {

  // @Authorized()
  @Get('/groups')
  @HttpCode(200)
  getGroups() {
    return Group.find()
  }

  //@Authorized()
  @Get('/groups/:id([0-9]+)')
  @HttpCode(200)
  getGroup(
    @Param('id') groupId: number
  ) {
    const group = Group.findOneById(groupId)
    return group
  }


  // getallStudents by ID
  @Get('/groups/:id([0-9]+)/students')
  @HttpCode(200)
  async getGroupSt(
    @Param('id') groupId: number
  ) {
    const group = await Group.findOneById(groupId)
    return group.student

  }

  @Get('/groups/:id([0-9]+)/random')
  @HttpCode(200)
  async getdSt(
    @Param('id') groupId: number
  ) {
    const group = await Group.findOneById(groupId)
    const dStudent = randomStudent(group!)
    return dStudent
  }

  @Get('/groups/:id([0-9]+)/progress')
  @HttpCode(200)
  async getProgress(
    @Param('id') groupId: number
  ) {
    const group = await Group.findOneById(groupId)

    const x = progressBar(group!)
    return x

  }


  @Get('/groups/:id([0-9]+)/progressBar')
  @HttpCode(200)
  async getProgressBar(
    @Param('id') groupId: number
  ) {
    const group = await Group.findOneById(groupId)

    const x = progressBar(group)
    return x

  }

  @Post('/groups/:id([0-9]+)/students')
  @HttpCode(200)
  async addStudents(
    @Param('id') groupId: number,
    @Body() student: Student
  ) {
    const group: any = await Group.findOneById(groupId)
    await Student.create({
      name: student.name,
      picture: student.picture,
      group: group
    }).save()
    return "Succesfully added new student"

  }

  @Patch('/student/:id([0-9]+)')
  @HttpCode(200)
  async changeStudents(
    @Param('id') studentId: number,
    @Body()
    student: Partial<Student>
  ) {
    const stud = await Student.findOneById(studentId)
    await Student.merge(stud, student).save()
    return "Succesfully changed new student"

  }

  @Post("/students/:id([0-9]+)/mark")
  @HttpCode(201)
  async addMark(
    @Param('id') id: number,
    @Body() mark: Day,

  ) {
    const oneStudent = await Student.findOneById(id)
    let day = await Day.create({
      colour: mark.colour,
      date: mark.date,
      text: mark.text,
      student: oneStudent,
    }).save();
    return day
  }

  // getallStudents by ID
  @Get('/student/:id([0-9]+)')
  @HttpCode(200)
  async getStudent(
    @Param('id') studentId: number
  ) {
    const student: any = await Student.findOneById(studentId)

    return student

  }


  //
  // POST when new group
  //
  //@Authorized()
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
    return entityGroup
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


  //@Authorized()
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
  @Get('/students/group/:id([0-9]+)/random')
  @HttpCode(200)
  async getRStudent(
    @Param('id') groupId: number
  ) {
    const group = await Group.findOneById(groupId)
    return group

  }

}
