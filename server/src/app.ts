import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import evaluationController from './evaluation/controller'

export const app = createKoaServer({
  cors: true,
  controllers: [
    evaluationController
  ]
})
