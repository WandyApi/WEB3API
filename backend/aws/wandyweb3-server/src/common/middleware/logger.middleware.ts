import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码

    next();
    // 组装日志信息
    const logFormat = `
    [${req.ip}, ${req.originalUrl}, ${req.method},params = ${JSON.stringify(
      req.params,
    )}, query=${JSON.stringify(req.query)}, ${code} ]
   `;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat, 'HTTP');
    } else if (code >= 400) {
      Logger.warn(logFormat, 'HTTP');
    } else {
      // Logger.access(logFormat);
      Logger.log(logFormat, 'HTTP');
    }
  }
}
