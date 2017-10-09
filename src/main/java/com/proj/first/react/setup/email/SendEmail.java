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

import org.springframework.stereotype.Service;

@Service
public class SendEmail {
	
	Properties prop = new Properties();
	InputStream input = null;

	public void sendMail() throws MessagingException, IOException {
		input = new FileInputStream("src/main/resources/local.properties");
		prop.load(input);

		final String username = "cpsjtho@gmail.com";
		final String password = prop.getProperty("config.gmail.password");
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress("jjthom87@yahoo.com"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress("jjthom87@yahoo.com"));
			message.setSubject("Ping");
			message.setText("Hello, this is example of sending email  ");

			Transport.send(message);
			System.out.println("message sent successfully....");

		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
}