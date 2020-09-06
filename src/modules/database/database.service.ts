import * as fs from 'fs';
import * as path from 'path';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DATABASE_PATH } from './constants/database-path.constant';
import { Entity } from '../../interfaces/entity.interface';
import { EntityNames } from '../../enums/entity-names.enum';
import { EntityNotFoundException } from '../../exceptions/entity-not-found.exception';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject(DATABASE_PATH) private readonly databasePath: string) {}

  // Ensures that the database folder exists
  onModuleInit() {
    if (!fs.existsSync(this.databasePath)) {
      fs.mkdirSync(this.databasePath);
    }
  }

  // Generates new id by finding the next integer
  private generateNextId(entityName: EntityNames): number {
    const allIds = this.findAll(entityName).map(entity => entity.id);
    return Math.max(0, ...allIds) + 1;
  }

  // Returns filepath for given entities collection
  private getFilePath(entityName: EntityNames): string {
    return path.join(this.databasePath, `${entityName}.json`);
  }

  // Saves the entire collection to file
  private saveFile<T extends Entity>(entityName: EntityNames, collection: T[]) {
    fs.writeFileSync(
      this.getFilePath(entityName),
      JSON.stringify(collection, null, 4),
    );
  }

  // Reads the entire collection from file
  private readFile<T extends Entity>(entityName: EntityNames): T[] {
    const filePath = this.getFilePath(entityName);
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const data = fs.readFileSync(
      path.join(this.databasePath, `${entityName}.json`),
      'utf-8',
    );

    return JSON.parse(data);
  }

  // Returns all entities with optional filtering
  findAll<T extends Entity>(
    entityName: EntityNames,
    filter?: (entity: T) => boolean,
  ): T[] {
    const allEntities = this.readFile(entityName) as T[];

    return filter ? allEntities.filter(filter) : allEntities;
  }

  // Returns one entity by id
  findById<T extends Entity>(entityName: EntityNames, id: number): T | null {
    const foundEntities = this.findAll<T>(
      entityName,
      entity => entity.id === id,
    );
    return foundEntities.length === 0 ? null : foundEntities[0];
  }

  // Saves new entity to file
  save<T>(entityName: EntityNames, data: any): T {
    const newEntity = {
      ...data,
      id: this.generateNextId(entityName),
    };

    const existingEntities = this.findAll(entityName);
    this.saveFile(entityName, [...existingEntities, newEntity]);

    return newEntity;
  }

  // Updates an existing entity
  updateById<T extends Entity>(
    entityName: EntityNames,
    entityId: number,
    data: Partial<T>,
  ): T {
    const existingEntity = this.findById<T>(entityName, entityId);

    if (!existingEntity) {
      throw new EntityNotFoundException(entityName, entityId);
    }

    const newEntity = {
      ...existingEntity,
      ...data,
    };

    // Gets all entities and replaces the updated entity
    const existingEntities = this.findAll(entityName);
    const newEntities = existingEntities.map(entity =>
      entity.id !== entityId ? entity : newEntity,
    );

    this.saveFile(entityName, newEntities);

    return newEntity;
  }

  // Removes an entity from collection by id
  removeById<T extends Entity>(entityName: EntityNames, entityId: number): T {
    const entityToRemove = this.findById<T>(entityName, entityId);

    if (!entityToRemove) {
      throw new EntityNotFoundException(entityName, entityId);
    }

    // Gets all entities and filters out the entity, which should be removed
    const newEntities = this.findAll<T>(entityName).filter(
      entity => entity.id !== entityId,
    );
    this.saveFile(entityName, newEntities);

    return entityToRemove;
  }
}
