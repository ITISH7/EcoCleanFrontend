package com.junk.management.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.endpoints.internal.Value.Str;

@Configuration
public class AWSConfig {

  @Value("${AWS_REGION}")
  private String region;

  @Bean
  public SesClient sesClient() {

    return SesClient.builder().region(Region.of(region)).credentialsProvider(
            EnvironmentVariableCredentialsProvider.create())
        .build();
  }
}
