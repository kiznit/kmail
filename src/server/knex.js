import Knex from 'knex';
import config from './config';

const knex = Knex(config.database);

export default knex;
