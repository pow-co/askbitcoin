
import { knex } from './knex'


interface FindOrCreate<T> {
    isNew: boolean;
    record: T;
  }

export async function findOrCreate<T>(table: string, { where, defaults}: { where: any, defaults: any }): Promise<FindOrCreate<T>> {

    var result = await knex(table).where(where).limit(1)
  
    const [record] = result
  
    if (record) {
  
      return { record, isNew: false }
  
    }
  
    const [id] = await knex(table).insert(defaults)
  
    result = await knex(table).where({ id }).limit(1)
  
    return { record: result[0], isNew: true }
    
  }
  
  export async function findOne<T>(table: string, { where}: { where: any }): Promise<T | null> {
  
    let [record] = await knex(table).where(where).limit(1)
  
    return record
    
  }