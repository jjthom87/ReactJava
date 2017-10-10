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

	Properties prop = new Properties();
	InputStream input = null;
	final static Logger logger = Logger.getLogger(SendEmail.class);

	@Value("${config.host-url}")
	private String hostUrl;

	public void sendMail(String uid, String email) throws MessagingException, IOException {
		// input = new FileInputStream("src/main/resources/local.properties");
		// prop.load(input);

		final String username = "cpsjtho@gmail.com";
		// final String password = prop.getProperty("config.gmail.password");
		final String password = System.getProperty("MAIL_PASS");
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
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
			message.setText("Please click link to verify registration: " + hostUrl + "api/email-conf/" + uid);

			Transport.send(message);
			logger.info("Email Sent to" + email);

		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
}