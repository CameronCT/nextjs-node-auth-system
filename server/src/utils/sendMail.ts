import sgMail from "@sendgrid/mail";
import Config from "../config";

export default async (
    to: string,
    subject: string,
    message: string
) => {
    sgMail.setApiKey(Config.emailCredentials.privateKey || '');

    const messageHTML = `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <title></title>
            <!--[if mso]>
            <noscript>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            </noscript>
            <![endif]-->
            <style>
                table, td, div, h1, p {font-family: Arial, sans-serif;}
            </style>
        </head>
        <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                <tr>
                    <td align="center" style="padding:0;">
                        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                            <tr>
                                <td style="width: 100%; padding: 2rem; text-align: center; background: #FB923C; color: #fff; font-weight: 600; font-size: 24px;">
                                    ${Config.name}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:36px 30px 42px 30px;">
                                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                        <tr>
                                            <td style="padding:0 0 36px 0;color:#153643;">
                                                <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><h1 style="font-size: 20px; padding-bottom: 5px;">Hello,</h1>${message}<br/><br/>Thanks,<br/>${Config.name} Team</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    const msgOptions = {
        to,
        from: Config.emailConfiguration.from,
        subject,
        text: message,
        html: `${messageHTML}`
    };

    try {
        await sgMail.send(msgOptions);
    } catch(error) {
        // @ts-ignore
        console.log(`[SendGrid] Error sending email: ${error.response.body.errors[0].message || 'unknown'}`)
    }   
}