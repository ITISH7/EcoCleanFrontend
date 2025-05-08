package com.junk.management.exception;

public class JunkItemNotFoundException extends RuntimeException {
  public JunkItemNotFoundException(String message) {
    super(message);
  }
}
