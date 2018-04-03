import { JsonController, Param, BadRequestError, NotFoundError, Get, Body, Patch, Delete, HttpCode, Post, HeaderParam } from 'routing-controllers'
import { Teacher, Group, Student, Day } from './entities'
import { Validate } from 'class-validator'
import * as request from 'superagent'

@JsonController()
export default class evaluationController {

  @Get('/groups')
  @HttpCode(200)
  getGroups() {
   return Group.find()
  }

  @Get('/groups/:id([0-9]+)')
  @HttpCode(200)
  getGroup(
    @Param('id') groupId: number
  ) {
   return Group.findOneById(groupId)
  }


//
// POST
//
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
}
