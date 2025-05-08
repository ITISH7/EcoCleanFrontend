package com.junk.management.exception;

public class DuplicatePhoneNumberException extends RuntimeException {

  public DuplicatePhoneNumberException(String message) {
    super(message);
  }
}
