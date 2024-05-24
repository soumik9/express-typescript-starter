import { JwtPayload } from "jsonwebtoken";
import { IMulterFiles } from "../../utils/type/file";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload | null;
            file: any;
            files: any;
        }
    }
}