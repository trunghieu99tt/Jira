import { Logger } from '@nestjs/common';
import { SelectQueryBuilder, MoreThan, LessThan } from 'typeorm';
import { PaginationArgs } from '../dto/pagination-args.dto';
import { PageInfoDto } from '../dto/page-info.dto';

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  paginationArgs: PaginationArgs,
  cursorColumn = 'id',
  defaultLimit = 25,
): Promise<any> {
  const logger = new Logger('Pagination');

  // pagination ordering
  query.orderBy({ [cursorColumn]: 'DESC' });

  const totalCountQuery = query.clone();

  // FORWARD pagination
  logger.debug('paginationArgs.first', paginationArgs);
  if (paginationArgs.first) {
    if (paginationArgs.after) {
      logger.debug(paginationArgs.after);
      const offsetId = Number(
        Buffer.from(paginationArgs.after, 'base64').toString('ascii'),
      );
      logger.verbose(`Paginate AfterID: ${offsetId}`);
      query.where({ [cursorColumn]: MoreThan(offsetId) });
    }

    const limit = paginationArgs.first ?? defaultLimit;

    query.take(limit);
  }

  // REVERSE pagination
  else if (paginationArgs.last && paginationArgs.before) {
    const offsetId = Number(
      Buffer.from(paginationArgs.before, 'base64').toString('ascii'),
    );
    logger.verbose(`Paginate BeforeID: ${offsetId}`);

    const limit = paginationArgs.last ?? defaultLimit;

    query.where({ [cursorColumn]: LessThan(offsetId) }).take(limit);
  }

  const result = await query.getMany();

  const startCursorId: any =
    result.length > 0 ? (result?.[0] as any)[cursorColumn] : null;
  const endCursorId: any =
    result.length > 0 ? (result.slice(-1)[0] as any)[cursorColumn] : null;

  const beforeQuery = totalCountQuery.clone();

  const afterQuery = beforeQuery.clone();

  let countBefore = 0;
  let countAfter = 0;
  if (
    beforeQuery.expressionMap.wheres &&
    beforeQuery.expressionMap.wheres.length
  ) {
    countBefore = await beforeQuery
      .andWhere(`${cursorColumn} < :cursor`, { cursor: startCursorId })
      .getCount();
    countAfter = await afterQuery
      .andWhere(`${cursorColumn} > :cursor`, { cursor: endCursorId })
      .getCount();
  } else {
    countBefore = await beforeQuery
      .where(`${cursorColumn} < :cursor`, { cursor: startCursorId })
      .getCount();

    countAfter = await afterQuery
      .where(`${cursorColumn} > :cursor`, { cursor: endCursorId })
      .getCount();
  }

  logger.debug(`CountBefore:${countBefore}`);
  logger.debug(`CountAfter:${countAfter}`);

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(`${(value as any)[cursorColumn]}`).toString('base64'),
    };
  });

  const pageInfo = new PageInfoDto();
  (pageInfo as any).startCursor = edges.length > 0 ? edges[0].cursor : null;
  (pageInfo as any).endCursor =
    edges.length > 0 ? edges.slice(-1)[0].cursor : null;

  pageInfo.hasNextPage = countAfter > 0;
  pageInfo.hasPreviousPage = countBefore > 0;
  // pageInfo.countBefore = countBefore;
  // pageInfo.countNext = countAfter;
  // pageInfo.countCurrent = edges.length;
  pageInfo.totalCount = countAfter + countBefore + edges.length;

  logger.debug(`PageInfo: ${JSON.stringify(pageInfo)}`);

  return { edges, ...pageInfo };
}
