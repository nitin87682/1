/*
SQLyog Enterprise - MySQL GUI v8.2 
MySQL - 5.0.45-community-nt : Database - parallel_proj
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`parallel_proj` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `parallel_proj`;

/*Table structure for table `actor` */

DROP TABLE IF EXISTS `actor`;

CREATE TABLE `actor` (
  `actor_id` int(10) NOT NULL auto_increment,
  `first_name` varchar(100) default NULL,
  `last_name` varchar(100) default NULL,
  `date_of_birth` date default NULL,
  `actor_image` varchar(200) default NULL,
  `last_created` date default NULL,
  `last_deleted` date default '0000-00-00',
  PRIMARY KEY  (`actor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*Data for the table `actor` */

insert  into `actor`(`actor_id`,`first_name`,`last_name`,`date_of_birth`,`actor_image`,`last_created`,`last_deleted`) values (1,'SHAHRUKH','KHAN','1965-11-02','https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&','2016-04-16','0000-00-00'),(2,'SALMAN','KHAN','1965-12-27','https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&','2016-04-16','0000-00-00'),(3,'AKSHAY ','KUMAR','1967-09-09','https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&','2016-04-16','0000-00-00'),(4,'AAMIR ','KHAN','1965-04-14','https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&','2016-04-16','0000-00-00'),(5,'Parineeti','Chopra','1988-01-22','http://www.santabanta.com/wallpapers/parineeti-chopra/','2016-04-18','0000-00-00'),(6,'Deepika','Padukone','1990-01-02','http://abc.com','2016-04-18','0000-00-00'),(7,'Alia','Bhatt','1992-01-01','sb.com','2016-04-18','2016-04-20'),(8,'Salman','Khan','2016-01-01','www.google.com','2016-04-20','2016-04-20'),(9,'','','1992-01-01','','2016-04-21','0000-00-00'),(10,'fuddu','kussa','2016-01-13','fghgf','2016-04-22','2016-04-22'),(11,'swds','dede','0012-07-08','ewe','2016-04-22','0000-00-00'),(12,'Salman','Khan','2016-01-01','www.google.com','2016-04-22','0000-00-00');

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int(50) NOT NULL auto_increment,
  `name` varchar(50) default NULL,
  `last_created` date default NULL,
  `last_deleted` date default '0000-00-00',
  PRIMARY KEY  (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `category` */

insert  into `category`(`category_id`,`name`,`last_created`,`last_deleted`) values (1,'ACTION','2016-04-16','0000-00-00'),(2,'ROMANTIC','2016-04-16','0000-00-00'),(3,'SCI-FICTION','2016-04-16','0000-00-00'),(4,'HORROR','2016-04-16','0000-00-00'),(5,'DRAMA','2016-04-16','0000-00-00'),(6,'THRILLER','2016-04-16','0000-00-00'),(7,'COMEDY','2016-04-16','0000-00-00'),(8,'DOCUMENTRY','2016-04-16','0000-00-00');

/*Table structure for table `film` */

DROP TABLE IF EXISTS `film`;

CREATE TABLE `film` (
  `film_id` int(50) NOT NULL auto_increment,
  `title` varchar(50) default NULL,
  `description` mediumtext,
  `release_year` year(4) default NULL,
  `language_id` int(20) default NULL,
  `length` int(20) default NULL,
  `rating` varchar(20) default NULL,
  `last_created` date default NULL,
  `last_deleted` date default '0000-00-00',
  PRIMARY KEY  (`film_id`),
  KEY `FK_film` (`language_id`),
  CONSTRAINT `FK_film` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `film` */

insert  into `film`(`film_id`,`title`,`description`,`release_year`,`language_id`,`length`,`rating`,`last_created`,`last_deleted`) values (1,'DDLJ','Raj Malhotra (Shah R',1995,1,150,'4.5','2016-04-16','0000-00-00'),(2,'Bajrangi bhaijaan','In Sultanpur, a pict',2015,1,160,'4.0','2016-04-16','0000-00-00'),(3,'Ambarsariya','A feud leads to new Love stories',2016,3,170,'4.0','2016-04-16','2016-04-20'),(4,'2 States','A marriage of two different cultures',2014,1,170,'4.2','2016-04-16','0000-00-00'),(5,'Ted ','A Cute talking teddy bear',2016,2,180,'4','2016-04-16','0000-00-00'),(8,'Snitch','A Drug network busted by a braveheart',2014,2,160,'4','2016-04-18','0000-00-00'),(9,'kapoor and Sons','MOVIE',2016,1,160,'5','2016-04-19','0000-00-00'),(10,'Jodha Akbar','MOVIE',2013,1,150,'4','2016-04-20','0000-00-00'),(11,'baluu','fuddu',2016,1,100,'4','2016-04-22','2016-04-22');

/*Table structure for table `film_actor` */

DROP TABLE IF EXISTS `film_actor`;

CREATE TABLE `film_actor` (
  `actor_id` int(20) NOT NULL,
  `film_id` int(20) NOT NULL,
  `last_created` date default NULL,
  `last_deleted` date default '0000-00-00',
  PRIMARY KEY  (`actor_id`,`film_id`),
  KEY `FK_film_actor` (`film_id`),
  CONSTRAINT `FK_film_actor_ACTOR` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`),
  CONSTRAINT `FK_film_actor` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `film_actor` */

insert  into `film_actor`(`actor_id`,`film_id`,`last_created`,`last_deleted`) values (1,1,'2016-04-16','0000-00-00'),(2,2,'2016-04-16','0000-00-00');

/*Table structure for table `film_category` */

DROP TABLE IF EXISTS `film_category`;

CREATE TABLE `film_category` (
  `film_id` int(20) NOT NULL,
  `category_id` int(20) NOT NULL,
  `last_created` date default NULL,
  `last_deleted` date default NULL,
  PRIMARY KEY  (`film_id`,`category_id`),
  KEY `FK_film_category1` (`category_id`),
  CONSTRAINT `FK_film_category2` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_film_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `film_category` */

insert  into `film_category`(`film_id`,`category_id`,`last_created`,`last_deleted`) values (1,2,'2016-04-16','0000-00-00'),(2,5,'2016-04-16','0000-00-00'),(4,2,'2016-04-16','0000-00-00');

/*Table structure for table `language` */

DROP TABLE IF EXISTS `language`;

CREATE TABLE `language` (
  `language_id` int(20) NOT NULL auto_increment,
  `langName` varchar(50) default NULL,
  `last_created` date default NULL,
  `last_deleted` date default NULL,
  PRIMARY KEY  (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `language` */

insert  into `language`(`language_id`,`langName`,`last_created`,`last_deleted`) values (1,'Hindi','2016-04-16',NULL),(2,'English','2016-04-16',NULL),(3,'Punjabi','2016-04-16',NULL),(4,'Marathi','2016-04-16',NULL),(5,'Kannada','2016-04-16',NULL),(6,'Telugu','2016-04-16',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
