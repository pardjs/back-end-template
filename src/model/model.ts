import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class Model<T> {
  protected repository!: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }
  find(options?: FindManyOptions<T>) {
    return this.repository.find(options);
  }

  findOne(options?: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  create(entityLike: DeepPartial<T>) {
    const newEntity = this.repository.create(entityLike);
    return this.repository.save(newEntity);
  }

  delete(criteria: FindConditions<T>) {
    return this.repository.delete(criteria);
  }

  update(criteria: FindConditions<T>, partialEntity: QueryDeepPartialEntity<T>) {
    return this.repository.update(criteria, partialEntity);
  }

  connected() {
    return this.repository.manager.connection.isConnected;
  }
}
