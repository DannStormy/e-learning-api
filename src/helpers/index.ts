import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IClassDocument } from '../api/model/classes/class.types';
import { ResponsePacket } from '../api/types'


/**
 * Handle api v1 route testing
 * @param res http response object
 */
export function testRoute(_: any, res: Response) {
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Test API' });
}

/**
 * Handle all non defined route visits
 * @param res http response object
 */
export function invalidRoute(_: any, res: Response) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not exist' });
}

export function errorResponse ({ res, data, message, statusCode = 500}: ResponsePacket) {
    res.status(statusCode).json({message, ...(data && { data })})
}
  
export function successResponse ({ res, data, message, statusCode = 500}: ResponsePacket) {
    res.status(statusCode).json({message, ...(data && { data })})
}
  
export function getPagingData(data_: { count: number, rows: IClassDocument[] }, page: number, limit: number) {
    const { count: totalItems, rows: data } = data_;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages, currentPage };
}
  
export function getPagination(page: number, size: number) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

export function toLower (str: string) {
    return str.toLowerCase();
}
  