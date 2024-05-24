import { Request } from "express";
import getRequestUrl from "../global/getRequestUrl";
import fs from 'fs'
import ejs from 'ejs'

const sassInvitationEmailTemp = async (organizerId: string, req: Request) => {

    // making url for invitation
    const base64Hash = Buffer.from(organizerId).toString('base64');

    const invitationUrl = `${getRequestUrl.getRequestBaseUrl(req)}/api/v1/invitation/set-password/${base64Hash}`;

    // Render the EJS template with data
    const templateContent = fs.readFileSync('app/views/InvitationEmail.ejs', 'utf8');
    const mailTemp = ejs.render(templateContent, { invitationUrl });

    return mailTemp;
}

export default {
    sassInvitationEmailTemp
}