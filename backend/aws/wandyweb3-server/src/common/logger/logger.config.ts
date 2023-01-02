import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export default WinstonModule.createLogger({
  exitOnError: false,
  //这里的format是通用配置
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('WANDY-API-SERVER', {
      prettyPrint: true,
    }),
    //关闭颜色一定放在最后一项，否则上面的nestWinstonModuleUtilities会打开颜色
    // winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console({
      //这里的format如果有配置会重写上面的format
      format: winston.format.combine(),
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} [${info.level}] [${info.context}] ${info.message} - ${info.stack}`,
        ),
        winston.format.uncolorize(),
      ),

      dirname: './logs/info',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '100m',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} [${info.level}] [${info.context}] ${info.message} - ${info.stack}`,
        ),
        //这里重写关闭颜色，否则写入文件会乱码
        winston.format.uncolorize(),
      ),
      dirname: './logs/error',
      filename: 'error.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '100m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
});
