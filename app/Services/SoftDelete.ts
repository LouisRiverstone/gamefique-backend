import { LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  if (row[column]) {
    if (row[column].isLuxonDateTime) {
      row[column] = DateTime.local();
    } else {
      row[column] = true;
    }
    await row.save();
  }
}