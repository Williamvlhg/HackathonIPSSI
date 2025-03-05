import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { app } from './lib/express'

import GetWorkerRouter from './routes/get/worker'
import GetSkillRouter from './routes/get/skill'
import GetUserRouter from './routes/get/user'
import GetSiteRouter from './routes/get/site'
import GetRoleRouter from './routes/get/role'
import GetMissionRouter from './routes/get/mission'

import DeleteWorkerRouter from './routes/delete/worker'
import DeleteSkillRouter from './routes/delete/skill'
import DeleteUserRouter from './routes/delete/user'
import DeleteSiteRouter from './routes/delete/site'
import DeleteMissionRouter from './routes/delete/mission'

import PostLoginRouter from './routes/post/login'
import PostRegisterRouter from './routes/post/register'
import PostSiteRouter from './routes/post/site'
import PostSkillRouter from './routes/post/skill'
import PostMissionRouter from './routes/post/mission'

import PutSkillRouter from './routes/put/skill'
import PutUserRouter from './routes/put/user'
import PutWorkerRouter from './routes/put/worker'
import PutSiteRouter from './routes/put/site'
import PutMissionRouter from './routes/put/mission'

dotenv.config()

const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

// ROUTES GET
app.use('/worker', GetWorkerRouter)
app.use('/skill', GetSkillRouter)
app.use('/user', GetUserRouter)
app.use('/site', GetSiteRouter)
app.use('/role', GetRoleRouter)
app.use('/mission', GetMissionRouter)

// ROUTES DELETE
app.use('/worker', DeleteWorkerRouter)
app.use('/skill', DeleteSkillRouter)
app.use('/user', DeleteUserRouter)
app.use('/site', DeleteSiteRouter)
app.use('/mission', DeleteMissionRouter)

// ROUTES POST
app.use('/login', PostLoginRouter)
app.use('/register', PostRegisterRouter)
app.use('/site', PostSiteRouter)
app.use('/skill', PostSkillRouter)
app.use('/mission', PostMissionRouter)

// ROUTES PUT
app.use('/skill', PutSkillRouter)
app.use('/user', PutUserRouter)
app.use('/worker', PutWorkerRouter)
app.use('/site', PutSiteRouter)
app.use('/mission', PutMissionRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
