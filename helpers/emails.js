import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, name, token } = data;

      // Send email
      await transport.sendMail({
        from: 'RealEstates.com',
        to: email,
        subject: 'RealEstates Account Confirmation',
        text: 'RealEstates Account Confirmation',
        html: `<!DOCTYPE html>
                    <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Account Confirmation</title>
                        </head>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <h1 style="color: #333333;"><strong>${name}, </strong> Confirm your Account!</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #555555;">
                                        <p style="font-size: 16px;">Thank you for registering at <strong>Real Estates</strong>. To complete your registration, please confirm your account by clicking the button below.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding: 20px;">
                                        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}" style="background-color: #4CAF50; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Confirm Account</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #555555;">
                                        <p style="font-size: 14px;">If you don't create this account, please ignore this message.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #777777; font-size: 12px;">
                                        <p>&copy; 2024 Real Estates. All roghts Reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>
        `})
}

const forgotPassordrEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, name, token } = data;

      // Send email
      await transport.sendMail({
        from: 'RealEstates.com',
        to: email,
        subject: 'RealEstates Password Recovery',
        text: 'RealEstates Password Recovery',
        html: `<!DOCTYPE html>
                    <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Password Recovery</title>
                        </head>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <h1 style="color: #333333;"><strong>${name}, </strong> Reset your password!</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #555555;">
                                        <p style="font-size: 16px;">Thanks you for using <strong>Real Estates</strong>. To complete your password reset, please click in the button below.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding: 20px;">
                                        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/forgot-password/${token}" style="background-color: #4CAF50; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #555555;">
                                        <p style="font-size: 14px;">If you did not request a password change, please ignore this message.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; text-align: center; color: #777777; font-size: 12px;">
                                        <p>&copy; 2024 Real Estates. All roghts Reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>
        `})
};

export {
    registerEmail,
    forgotPassordrEmail
}