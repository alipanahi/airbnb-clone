import db from '../database'
const { Op } = require("sequelize");

const userController = {
  all: async () => {
    const users = await db.User.findAll()
    const parsedUser = JSON.parse(JSON.stringify(users))
    return parsedUser
  },
  find: async (id) => {
    return await db.User.findByPk(id)
  },
  findByEmail: async data =>{
    const [user,created] = await db.User.findOrCreate({
      where:{email:data.email},
      defaults: {
        firstName: data.name,
        type: 'buyer',
        password: data.email
      }
    })
    return JSON.parse(JSON.stringify(user))
  },
  authorize: async credentials => {
    return await db.User.findOne({
      where: {
        [Op.and]: [
          { email: credentials.email },
          { password: credentials.password}
        ]
      }
    })
  }
}

export default userController
