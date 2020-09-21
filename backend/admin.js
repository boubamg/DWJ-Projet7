const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)

const models = require('./models');
const adminBro = new AdminBro({
    databases: [models],
    resources: [{
        resource: models.User,
        options: {
            properties: {
              id: { isVisible: { list: true, filter: false, show: true, edit: false }, type: 'integer' },
              firstname: { isVisible: { list: true, filter: true, show: true, edit: false }, type: 'string' },
              lastname: { isVisible: { list: true, filter: true, show: true, edit: false }, type: 'string'},
              email: { isVisible: { list: true, filter: true, show: true, edit: false }, type: 'string'},
              password: { isVisible: { list: false, filter: false, show: false, edit: false }, type: 'string' },
              profilePicture: { isVisible: { list: false, filter: false, show: true, edit: false }, type: 'string' },
              biography: { isVisible: { list: false, filter: false, show: true, edit: true }, type: 'string' },
              isAdmin: { isVisible: { list: true, filter: true, show: true, edit: true }, type: 'boolean' },
              isActive: { isVisible: { list: true, filter: true, show: true, edit: true }, type: 'boolean' }
            }
          }
    }],
    rootPath: '/admin',
})

const adminRouter = AdminBroExpress.buildRouter(adminBro)

module.exports = adminRouter;