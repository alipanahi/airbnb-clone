import db from '../database'

const userController = {
  all: async () => {
    const users = await db.User.findAll()
    const parsedUser = JSON.parse(JSON.stringify(users))
    return parsedUser
  },
  find: async (id) => {
    return await db.User.findByPk(id)
  },
  findByEmail: async email =>{
    return await db.User.findOrCreate({where:{email:email}})
  }
}

export default userController
