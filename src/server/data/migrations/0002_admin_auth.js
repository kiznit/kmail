require('babel-register');
global.__BROWSER__ = false;
const config = require('../../config');
const { hashPassword } = require('../../auth');


exports.up = (knex, Promise) => {
    return hashPassword(config.adminPassword || '1234')
        .then(password => knex('users')
            .insert({
                username: 'admin',
                password,
            }));
};


exports.down = (knex, Promise) => {
    return knex('users')
        .where('username', 'admin')
        .delete();
};
