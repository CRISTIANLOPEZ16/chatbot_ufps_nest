import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm';
const dataSource= new DataSource(typeOrmConfig);
export default dataSource;