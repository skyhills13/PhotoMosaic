DROP TABLE IF EXISTS PHOTOS; 

CREATE TABLE PHOTOS ( 
 id int NOT NULL auto_increment, 
 unique_id varchar(60) NOT NULL,
 original_name varchar(45) NOT NULL, 
 mosaic_id int NOT NULL,
 primary key(id) 
);

CREATE TABLE MOSAICS (
 id int NOT NULL AUTO_INCREMENT,
 total_number int NOT NULL
);
