package com.junk.management.controller;

import com.junk.management.constant.AppConstants;
import com.junk.management.exception.AddressNotFoundException;
import com.junk.management.exception.AlreadyExistsException;
import com.junk.management.exception.DeleteOrderException;
import com.junk.management.exception.DuplicateEmailException;
import com.junk.management.exception.DuplicateJunkTypeException;
import com.junk.management.exception.DuplicatePhoneNumberException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.IncorrectCredentialsException;
import com.junk.management.exception.InvalidDateException;
import com.junk.management.exception.InvalidJunkCategoryException;
import com.junk.management.exception.JunkEntryFailedException;
import com.junk.management.exception.JunkItemNotFoundException;
import com.junk.management.exception.OrderNotFoundException;
import com.junk.management.exception.SessionNotFoundException;
import com.junk.management.exception.UnauthorizedAccessException;
import com.junk.management.exception.UnauthorizedActionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RestController
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
    StringBuilder errorMessage = new StringBuilder("Validation failed: ");
    ex.getBindingResult().getAllErrors().forEach(error -> {
      errorMessage.append(error.getDefaultMessage()).append("; ");
    });
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage.toString());
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public String handleAccessDeniedException(AccessDeniedException ex) {
    return AppConstants.UNAUTHORIZED_ACTION;
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleGenericExceptions(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("An error occurred: " + ex.getMessage());
  }

  @ExceptionHandler(DuplicateEmailException.class)
  public ResponseEntity<String> handleDuplicateEmailException(DuplicateEmailException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(DuplicatePhoneNumberException.class)
  public ResponseEntity<String> handleDuplicatePhoneNumberException(
      DuplicatePhoneNumberException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(UnauthorizedAccessException.class)
  public ResponseEntity<String> handleUnauthorisedAccessException(UnauthorizedAccessException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(AddressNotFoundException.class)
  public ResponseEntity<String> handleAddressNotFound(AddressNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(SessionNotFoundException.class)
  public ResponseEntity<String> handleSessionNotFoundException(SessionNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(OrderNotFoundException.class)
  public ResponseEntity<String> handleOrderNotFoundException(OrderNotFoundException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(DeleteOrderException.class)
  public ResponseEntity<String> handleDeleteOrderException(DeleteOrderException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(IncorrectCredentialsException.class)
  public ResponseEntity<String> handleIncorrectCredentialsException(IncorrectCredentialsException ex){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(InvalidDateException.class)
  public ResponseEntity<String> handleInvalidDateException(InvalidDateException ex){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(UnauthorizedActionException.class)
  public ResponseEntity<String> handleUnauthorizedActionException(UnauthorizedActionException e){
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
  }

  @ExceptionHandler(DuplicateJunkTypeException.class)
  public ResponseEntity<String> handleDuplicateJunkTypeException(DuplicateJunkTypeException e){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler(InvalidJunkCategoryException.class)
  public ResponseEntity<String> handleInvalidJunkCategory(InvalidJunkCategoryException e){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler(JunkEntryFailedException.class)
  public ResponseEntity<String> handleJunkEntryFailedException(JunkEntryFailedException e){
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex){
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(AlreadyExistsException.class)
  public ResponseEntity<String> handleAlreadyExistsException(AlreadyExistsException ex){
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
  }

  @ExceptionHandler(JunkItemNotFoundException.class)
  public ResponseEntity<String> handleJunkItemNotFoundException(JunkItemNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
  }
}



