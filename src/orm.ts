
import { knex } from './knex'


interface FindOrCreate<T> {
    isNew: boolean;
    record: T;
  }

export async function findOrCreate<T>(table: string, { where, defaults}: { where: any, defaults: any }): Promise<FindOrCreate<T>> {

    var result = await knex(table).where(where).limit(1)
  
    var [record] = result
  
    if (record) {
  
      return { record, isNew: false }
  
    }

    const insert = Object.assign(defaults, {
        createdAt: new Date(),
        updatedAt: new Date()
    })
  
    const [newRecord] = await knex(table).insert(insert, ['*'])
  
    return { record: newRecord, isNew: true }
    
  }
  
  export async function findOne<T>(table: string, { where}: { where: any }): Promise<T | null> {
  
    let [record] = await knex(table).where(where).limit(1)
  
    return record
    
  }