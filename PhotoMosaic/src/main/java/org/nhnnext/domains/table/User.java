package org.nhnnext.domains.table;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

public class User {

	private int id;
	@NotEmpty @Email
	private String email;
	@NotEmpty @Size(min=4, max=12)
	private String password;

	public User() {
	}

	public User(int id, String email, String password) {
		this.id = id;
		this.email = email;
		this.password = password;
	}

	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean matchEmail(String email) {
		return this.email.equals(email);
	}
	
	public boolean matchPassword(String password) {
		return this.password.equals(password);
	}
	

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password
				+ "]";
	}

	public int hashCode() {
		final int prime = 31;
		int result = 1;
		//result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		return result;
	}

}
