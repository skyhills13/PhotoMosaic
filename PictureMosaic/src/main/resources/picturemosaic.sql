DROP TABLE IF EXISTS photos; 

CREATE TABLE photo ( 
 photoId int NOT NULL auto_increment, 
 name varchar(45) NOT NULL, 
 size double NOT NULL, 
 originalWidth int not null, 
 originalHeight int not null,
 mosaicId int not null,

 primary key(photoId)
);
