exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned();
        table.string('username').notNull().index();
        table.string('password').notNull();
        table.timestamps();
    });
};


exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
