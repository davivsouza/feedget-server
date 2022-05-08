import nodemailer from 'nodemailer'
import { MailAdapter, SendEmailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "609744541040de",
    pass: "2978e0f801287e",
  },
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({subject,body}: SendEmailData) {
    transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Davi v. Souza <davivasconcelossouza21@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
