import { Request, Response } from "express";

/**
 * This defines what our responses should look like
 * @type
 */


export type ResponsePacket = {
  res: Response;
  data?: any;
  message: string;
  error?: Error;
  statusCode?: number;
}