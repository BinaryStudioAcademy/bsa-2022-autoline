import { INodemailerPayload } from '../interfaces/INodemailerPayload';

export const getMessage = (payload: INodemailerPayload): string => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>HTML email template</title>
        <meta name="viewport" content="width = 375, initial-scale = -1">
      </head>
      <body style="background-color: #ffffff; font-size: 16px;">
        <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0" style="height:100%; width:600px;">
              <tr>
                <td align="center" bgcolor="#ffffff" style="padding:30px">
                  <p style="text-align:left">Hello, ${payload.name}<br><br> Your password has been changed successfully.
                  </p>
                  <p style="text-align:left">
                  Sincerely,<br>Autoline Team
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </html>
  `;
};
