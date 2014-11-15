DROP TABLE IF EXISTS `photos` ;
DROP TABLE IF EXISTS `mosaics`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(45) NOT NULL,
	`password` VARCHAR(45) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `mosaics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file_name` VARCHAR(45),
  `url` VARCHAR(45) NOT NULL DEFAULT 'default',
  `title` VARCHAR(45) NOT NULL DEFAULT 'default',
  `comment` VARCHAR(140) NOT NULL DEFAULT 'default',
  `created_date` TIMESTAMP,
  `users_id` INT,
  PRIMARY KEY (`id`),
  INDEX `fk_mosaics_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_mosaics_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `unique_id` VARCHAR(60) NOT NULL,
  `original_name` VARCHAR(45) NOT NULL,
  `original_width` INT NOT NULL DEFAULT 0,
  `original_height` INT NOT NULL DEFAULT 0,
  `scaled_width` INT NOT NULL DEFAULT 0,
  `scaled_height` INT NOT NULL DEFAULT 0 COMMENT '	 ',
  `mosaics_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_photos_mosaics_idx` (`mosaics_id` ASC),
  CONSTRAINT `fk_photos_mosaics`
    FOREIGN KEY (`mosaics_id`)
    REFERENCES `mosaics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);