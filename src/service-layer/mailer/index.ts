
import * as config from 'config'

const sgMail = require('@sendgrid/mail');
const KEY_SENDGRID=config.get("sendgrid.key")


const DOMAIN=config.get("domain")
const FRONT=config.get("front")


export const MailerService={
  send: (id,name,email,token)=>{
    console.log(name,email,token);
    sgMail.setApiKey(KEY_SENDGRID);
    let link=`${DOMAIN}/account?action=verify&tkt=${token}`
    let _html=`<h4>Hi ${name}</h4><p>please click <a href="${link}"> here </a>to confirm your account<br>
    your marketplace url : ${FRONT}/marketplace/${id}`
    const msg = {
      to: email,
      from: 'admin@marketplace.com',
      subject: 'Congratulation',
      text: 'you have just create new marketplace',
      html: _html,
    };
    console.log("sending email")
  
      sgMail.send(msg);
  }


}