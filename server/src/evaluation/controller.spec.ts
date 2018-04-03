import 'jest'
import * as request from 'supertest'
import {app} from '../app'
import setupDb from '../db'

beforeAll(async () => {
  await setupDb()
})

describe('getQuizzesController', () => {
  test('/quizzes', async () => {
    await request(await app.callback())
    .get('/quizzes')
    .set('Accept', 'application/json')
    .set('x-user-roles', 'teacher')
    .expect(200)
  })
})

describe('getQuizzesIdController', () => {
  test('/quizzes/:id([0-9]+)', async () => {
    await request(await app.callback())
    .get('/quizzes')
    .set('Accept', 'application/json')
    .set('x-user-roles', 'teacher')
    .expect(200)
  })
})

describe('postQuizzesController', () => {
  test('/quizzes', async () => {
    const target = {
      "id": 1,
 "title": "RETS",
 "question": [
     {
         "id": 1,
         "text": "What is RED?",
         "type": "radio",
         "answer": [
             {
                 "correct": true,
                 "id": 1,
                 "text": "No yolo"
             }]}]

   }
    await request(await app.callback())

    .post('/quizzes')
    .set('Accept', 'application/json')
    .set('x-user-roles', 'teacher')
    .send(target)
    .expect(201)
  })
})

describe('patchQuizzesController', () => {
  test('/quizzes', async () => {
    const target = {
      "id": 1,
 "title": "RETS",
 "question": [
     {
         "id": 1,
         "text": "What is RED?",
         "type": "radio",
         "answer": [
             {
                 "correct": true,
                 "id": 1,
                 "text": "No yolo"
             }]}]

   }
    await request(await app.callback())
    .patch('/quizzes')
    .set('Accept', 'application/json')
    .set('x-user-roles', 'teacher')
    .send(target)
    .expect(201)
  })
})

describe('deleteQuizzesController', () => {
  test('/quizzes/:id([0-9]+)', async () => {
    await request(await app.callback())
    .delete('/quizzes')
    .set('Accept', 'application/json')
    .set('x-user-roles', 'teacher')
    .expect(204)
  })
})
