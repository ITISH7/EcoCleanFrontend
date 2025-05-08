package com.junk.management.service.impl;

import com.junk.management.constant.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;
import software.amazon.awssdk.services.ses.model.SendEmailResponse;
import software.amazon.awssdk.services.ses.model.SesException;

@Service
public class SesEmailService {

  @Autowired
  private SesClient sesClient;

  @Value("${SENDER_EMAIL}")
  private String senderEmail;

  private static final Logger log = LoggerFactory.getLogger(SesEmailService.class);

  public void sendEmail(String receiver) {

    try {
      SendEmailRequest emailRequest = SendEmailRequest.builder()
          .destination(Destination.builder().toAddresses(receiver).build()).message(
              Message.builder().subject(Content.builder().data(AppConstants.EMAIL_SUBJECT).build())
                  .body(Body.builder().text(
                      Content.builder().data(AppConstants.EMAIL_BODY).build()).build()).build())
          .source(senderEmail).build();

      SendEmailResponse response = sesClient.sendEmail(emailRequest);
      log.info("Email sent successfully! to {}", receiver);
    } catch (SesException e) {
      log.error("Failed to send email: {}", e.getMessage());
    }
  }
}
