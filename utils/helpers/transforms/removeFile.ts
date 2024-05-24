import fs from 'fs';
import logger from '../logger/logger';

const removeFile = async (imgPath: string) => {
    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
        logger.log("info", `File ${imgPath} deleted successfully`);
    } else {
        logger.log("error", `File ${imgPath} does not exist`);
    }
}

export default removeFile;