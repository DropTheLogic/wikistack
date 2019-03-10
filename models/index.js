const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define ('page', {
    title: Sequelize.STRING,
    slug: {
         type: Sequelize.STRING,
         validate: {
             isUrl: true
         }
    },
    content: Sequelize.TEXT,
    status: Sequelize.BOOLEAN
});

const User = db.define ('user', {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});

module.exports = { Page, User, db };