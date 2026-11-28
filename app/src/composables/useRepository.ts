import type { DatabaseTables, TableIndex, TableName } from '#/db/database';
import { db } from '#/db/database';
import type { IndexableType, Table, UpdateSpec } from 'dexie';

/* ==================== Types ==================== */

type TableTypes<N extends TableName> =
    DatabaseTables[N] extends Table<infer TEntity, infer TKey, infer TInsert>
        ? { entity: TEntity; key: TKey; insert: TInsert }
        : never;

type Entity<N extends TableName> = TableTypes<N>['entity'];
type EntityKey<N extends TableName> = TableTypes<N>['key'];
type EntityInsert<N extends TableName> = TableTypes<N>['insert'];

/** Index declared in the schema that is also a property of the entity (i.e. queryable by value). */
type EntityIndex<N extends TableName> = TableIndex<N> & keyof Entity<N> & string;

type IndexValue<N extends TableName, I extends EntityIndex<N>> = Entity<N>[I] & IndexableType;

type OrderOptions = {
    reverse?: boolean;
};

/* ==================== Composable ==================== */

/**
 * Generic, type-safe CRUD access to a Dexie table.
 *
 * Index-based methods only accept indexes declared in the schema,
 * so querying a non-indexed field is a compile-time error.
 */
export function useRepository<N extends TableName>(tableName: N) {
    const table = db.table<Entity<N>, EntityKey<N>, EntityInsert<N>>(tableName);

    /* ---------- Read ---------- */

    async function getAll(): Promise<Entity<N>[]> {
        return table.toArray();
    }

    async function getById(id: EntityKey<N>): Promise<Entity<N> | undefined> {
        return table.get(id);
    }

    async function getByIds(ids: EntityKey<N>[]): Promise<(Entity<N> | undefined)[]> {
        return table.bulkGet(ids);
    }

    async function getAllOrderedBy(index: EntityIndex<N>, { reverse = false }: OrderOptions = {}): Promise<Entity<N>[]> {
        const collection = table.orderBy(index);

        return (reverse ? collection.reverse() : collection).toArray();
    }

    async function findWhere<I extends EntityIndex<N>>(index: I, value: IndexValue<N, I>): Promise<Entity<N>[]> {
        return table.where(index).equals(value).toArray();
    }

    /**
     * Values of an index for every entity (duplicates included), read from the index only:
     * records are not loaded nor deserialized.
     */
    async function getIndexValues<I extends EntityIndex<N>>(index: I): Promise<IndexValue<N, I>[]> {
        const keys = await table.orderBy(index).keys();

        return keys as IndexValue<N, I>[];
    }

    async function count(): Promise<number> {
        return table.count();
    }

    async function countWhere<I extends EntityIndex<N>>(index: I, value: IndexValue<N, I>): Promise<number> {
        return table.where(index).equals(value).count();
    }

    /* ---------- Write ---------- */

    async function add(item: EntityInsert<N>): Promise<EntityKey<N>> {
        return table.add(item);
    }

    async function bulkAdd(items: EntityInsert<N>[]): Promise<EntityKey<N>[]> {
        return table.bulkAdd(items, { allKeys: true });
    }

    /** @returns `true` if the entity exists and was updated. */
    async function update(id: EntityKey<N>, changes: UpdateSpec<EntityInsert<N>>): Promise<boolean> {
        const updatedCount = await table.update(id, changes);

        return updatedCount > 0;
    }

    async function remove(id: EntityKey<N>): Promise<void> {
        return table.delete(id);
    }

    async function bulkRemove(ids: EntityKey<N>[]): Promise<void> {
        return table.bulkDelete(ids);
    }

    async function removeWhere<I extends EntityIndex<N>>(index: I, value: IndexValue<N, I>): Promise<number> {
        return table.where(index).equals(value).delete();
    }

    return {
        table,
        getAll,
        getById,
        getByIds,
        getAllOrderedBy,
        findWhere,
        getIndexValues,
        count,
        countWhere,
        add,
        bulkAdd,
        update,
        remove,
        bulkRemove,
        removeWhere
    };
}

export type Repository<N extends TableName> = ReturnType<typeof useRepository<N>>;
