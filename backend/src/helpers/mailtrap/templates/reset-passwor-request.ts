import { NodemailerPayload } from '../interfaces/nodemailer-payload';

export const getMessage = (payload: NodemailerPayload): string => {
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
                  <p style="text-align:left">Hello, ${payload.name}<br><br> We received a request to reset the password for your account for this email address. To initiate the password reset process for your account, click the link below.
                  </p>
                  <p>
                    <a target="_blank" style="text-decoration:none; background-color: black; border: black 1px solid; color: #fff; padding:10px 10px; display:block;" href="http://${payload.link}">
                      <strong>Reset Password</strong></a>
                  </p>
                  <p style="text-align:left">This link can only be used once. If you need to reset your password again, please visit <a href="">autoline.com</a> and request another reset.<br><br>If you did not make this request, you can simply ignore this email.</p>
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
