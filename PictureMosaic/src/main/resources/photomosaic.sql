DROP TABLE IF EXISTS PHOTOS; 

CREATE TABLE PHOTOS ( 
 id int NOT NULL auto_increment, 
 unique_id varchar(60) NOT NULL,
 original_name varchar(45) NOT NULL, 
 primary key(id) 
);

