import fs from 'fs';
import { errorLogger, infoLogger } from '../logger/logger';

const removeFile = async (imgPath: string) => {
    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
        infoLogger.info(`File ${imgPath} deleted successfully`);
    } else {
        errorLogger.error(`File ${imgPath} does not exist`);
    }
}

export default removeFile;