package org.nhnnext.domains;

import static org.junit.Assert.*;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.junit.BeforeClass;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.hamcrest.CoreMatchers.*;

public class UserTest {
	private static final Logger logger = LoggerFactory.getLogger(UserTest.class);
	private static Validator validator;
	
	@BeforeClass
	public static void setUp(){
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		validator = factory.getValidator();
		
	}
    @Test
	public void userIdWhenIsEmpty() {
		User user = new User("" , "pa");
		Set<ConstraintViolation<User>> constraintViolations = validator.validate(user);
		// validation이 맞지 않는 것이 2개인지 체크해라. (size를 지키지 않은 것, notempty를 지키지 않은 것)
		for (ConstraintViolation<User> constraintViolation : constraintViolations) {
		    logger.debug("validation error message: {}", constraintViolation.getMessage());
		}
		assertThat(constraintViolations.size(), is(2));
	}
    
}
