declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    // Add other options as needed
  }

  export interface MailOptions {
    from?: string;
    to?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    // Add other options as needed
  }

  export interface Transporter {
    sendMail(mailOptions: MailOptions): Promise<any>;
  }

  export function createTransport(options: TransportOptions): Transporter;
}
