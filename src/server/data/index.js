import knex from 'knex';
import config from '../config';


const db = knex(config.database);

const dbInit = db.migrate.latest();


export { db, dbInit };
