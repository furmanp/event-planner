// import morgan from 'morgan';
// // import chalk, {ChalkInstance} from 'chalk';
// import { logger } from '../utils/winston-logger.js';
// import { Handler } from 'express';
//
// // morgan.token('statusColor', (_req: IncomingMessage, res: ServerResponse) => {
// //     // get the status code if response written
// //     const status: number = (
// //         typeof res.headersSent !== 'boolean' ? Boolean(res.headersSent) : res.headersSent
// //     )
// //         ? res.statusCode
// //         : undefined;
// //
// //     // get status color
// //     // // let color: ChalkInstance | ((arg0: number) => string);
// //     // // if (status >= 500) {
// //     // //     color = chalk.hex('#ff4757');
// //     // // } else if (status >= 400) {
// //     // //     color = chalk.hex('#FFFF00');
// //     // // } else if (status >= 300) {
// //     // //     color = chalk.hex('#00FFFF');
// //     // // } else if (status >= 200) {
// //     // //     color = chalk.hex('#00FF00');
// //     // // } else {
// //     // //     color = chalk.gray;
// //     // // }
// //     //
// //     // return color(status);
// // });
//
// const stream = {
//   write: (message: string) => logger.http(message.trim()),
// };
//
// const skip = () => {
//   const env: string = process.env.NODE_ENV || 'development';
//   return env !== 'development';
// };
//
// export const morganMiddleware: Handler = morgan({ stream, skip });
