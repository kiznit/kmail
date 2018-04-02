import knex from 'knex';
import config from '../config';


const db = knex(config.database);

const dbInitPromise = db.migrate.latest();


export { db, dbInitPromise };
