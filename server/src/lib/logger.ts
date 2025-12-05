import { Logger } from "tslog"
import { appendFileSync } from "fs"; 
import {promises as async_fs} from "fs"
import * as path from 'path';

const logger = new Logger({
 // hideLogPositionForProduction:true,
})
logger.settings.minLevel = 3; // 3 pour ne pas avoir les debug

logger.attachTransport( async (logObj) => {
  await async_fs.mkdir(path.dirname(`./logs/log-${Date.now()}.jsonl`), { recursive: true });
  appendFileSync(`./logs/log-${Date.now()}.jsonl`,logObj + "\n");
});

export default logger