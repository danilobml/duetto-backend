import nodemailer from "nodemailer";

export const send_mail = async (req, res) => {
  let { text, mail } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: mail,
    subject: "Class Booked through your Duetto App",
    html: `<div className="email" style="
        border: 1px solid black;
        width: fit-content;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <p>${text}</p>
    
        <p>All the best, Duetto Team</p>
         </div>
    `,
  });
};
