package com.proj.first.react.setup.email;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SendEmail {

	final static Logger logger = Logger.getLogger(SendEmail.class);

	@Value("${config.host-dev-url}")
	private String hostDevUrl;
	
	@Value("${config.host-prod-url}")
	private String hostProdUrl;

	public void sendMail(String uid, String email) throws MessagingException, IOException {
  		
		String url;
  		final String password;
		if(System.getenv("SENDGRID_KEY") == null) {
			InputStream input = new FileInputStream("src/main/resources/local.properties");
			Properties prop = new Properties();
	  		prop.load(input);
			password = prop.getProperty("config.sendgrid.key");
			url = hostDevUrl;
		} else {
			password = System.getenv("SENDGRID_KEY");
			url = hostProdUrl;
		}
		
		final String username = "apikey";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.sendgrid.net");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress("NO-REPLY@jcjt.com"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setSubject("Email Confirmation for Jared's Super Dope Site");
			message.setText("Please click link to verify registration: " + url + "api/email-conf/" + uid);

			Transport.send(message);
			logger.info("Email Sent to " + email);

		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
}