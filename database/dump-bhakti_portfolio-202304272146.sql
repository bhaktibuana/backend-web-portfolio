-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: bhakti_portfolio
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('RL-000001-230327-4d1c6a','SA','Super Admin'),('RL-000002-230327-01de69','USR','User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` varchar(100) NOT NULL,
  `title` varchar(20) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `source_link` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES ('SKLLS-000001-230329-669bee','JavaScript','/images/20230329-221857-JavaScript.png','https://www.javascript.com',13,'2023-03-29 22:22:17','bhaktimb','2023-03-29 22:22:17','bhaktimb',0),('SKLLS-000002-230427-4e916f','NodeJs','/images/20230427-192739-NodeJs.png','https://nodejs.org',4,'2023-04-27 19:27:49','bhaktimb','2023-04-27 19:27:49','bhaktimb',0),('SKLLS-000003-230427-7e32db','ExpressJs','/images/20230427-193735-ExpressJs.png','https://expressjs.com',5,'2023-04-27 19:38:26','bhaktimb','2023-04-27 19:38:26','bhaktimb',0),('SKLLS-000004-230427-a46179','TypeScript','/images/20230427-194450-TypeScript.png','https://www.typescriptlang.org',14,'2023-04-27 19:45:13','bhaktimb','2023-04-27 19:45:13','bhaktimb',0),('SKLLS-000005-230427-1ae29c','ReactJs','/images/20230427-195219-ReactJs.png','https://react.dev',1,'2023-04-27 19:52:57','bhaktimb','2023-04-27 19:52:57','bhaktimb',0),('SKLLS-000006-230427-b714f6','Angular','/images/20230427-195647-Angular.png','https://angular.io',3,'2023-04-27 19:57:20','bhaktimb','2023-04-27 19:57:20','bhaktimb',0),('SKLLS-000007-230427-3022af','VueJs','/images/20230427-195946-VueJs.png','https://vuejs.org',2,'2023-04-27 20:00:19','bhaktimb','2023-04-27 20:00:19','bhaktimb',0),('SKLLS-000008-230427-2125fa','Bootstrap','/images/20230427-200522-Bootstrap.png','https://getbootstrap.com',10,'2023-04-27 20:04:23','bhaktimb','2023-04-27 20:04:23','bhaktimb',0),('SKLLS-000009-230427-71c17b','Sass','/images/20230427-200915-Sass.png','https://sass-lang.com',11,'2023-04-27 20:09:39','bhaktimb','2023-04-27 20:09:39','bhaktimb',0),('SKLLS-000010-230427-5664fd','HTML5','/images/20230427-201206-Html5.png','https://www.w3schools.com/html',7,'2023-04-27 20:13:16','bhaktimb','2023-04-27 20:13:16','bhaktimb',0),('SKLLS-000011-230427-483318','TailwindCSS','/images/20230427-201654-TailwindCss.png','https://tailwindcss.com',8,'2023-04-27 20:17:03','bhaktimb','2023-04-27 20:17:03','bhaktimb',0),('SKLLS-000012-230427-3dc859','CSS3','/images/20230427-202042-Css3.png','https://www.w3schools.com/css',12,'2023-04-27 20:21:12','bhaktimb','2023-04-27 20:21:12','bhaktimb',0),('SKLLS-000013-230427-457c28','Python','/images/20230427-202434-Python.png','https://www.python.org',15,'2023-04-27 20:25:07','bhaktimb','2023-04-27 20:25:07','bhaktimb',0),('SKLLS-000014-230427-342501','PHP','/images/20230427-202703-Php.png','https://www.php.net',16,'2023-04-27 20:27:33','bhaktimb','2023-04-27 20:27:33','bhaktimb',0),('SKLLS-000015-230427-195f7e','CodeIgniter','/images/20230427-203051-CodeIgniter.png','https://codeigniter.com',17,'2023-04-27 20:31:09','bhaktimb','2023-04-27 20:31:09','bhaktimb',0),('SKLLS-000016-230427-72601c','Larevel','/images/20230427-203233-Laravel.png','https://laravel.com',18,'2023-04-27 20:33:00','bhaktimb','2023-04-27 20:33:00','bhaktimb',0),('SKLLS-000017-230427-423f27','MaterialUI','/images/20230427-203533-MaterialUi.png','https://mui.com',9,'2023-04-27 20:36:12','bhaktimb','2023-04-27 20:36:12','bhaktimb',0),('SKLLS-000018-230427-a8c200','React Query','/images/20230427-214213-ReactQuery.png','https://tanstack.com/query/v4/docs/react/overview',19,'2023-04-27 20:40:41','bhaktimb','2023-04-27 20:40:41','bhaktimb',0),('SKLLS-000019-230427-8bebf6','MongoDB','/images/20230427-204441-MongoDb.png','https://www.mongodb.com',23,'2023-04-27 20:46:17','bhaktimb','2023-04-27 20:46:17','bhaktimb',0),('SKLLS-000020-230427-837242','MySQL','/images/20230427-204749-MySql.png','https://www.mysql.com',20,'2023-04-27 20:48:21','bhaktimb','2023-04-27 20:48:21','bhaktimb',0),('SKLLS-000021-230427-3a5296','PostgreSQL','/images/20230427-204931-PostgreSql.png','https://www.postgresql.org',22,'2023-04-27 20:49:57','bhaktimb','2023-04-27 20:49:57','bhaktimb',0),('SKLLS-000022-230427-f97f46','MSSQL','/images/20230427-205348-MsSql.png','https://learn.microsoft.com/en-us/sql/sql-server',21,'2023-04-27 20:54:39','bhaktimb','2023-04-27 20:54:39','bhaktimb',0),('SKLLS-000023-230427-c204ea','AWS','/images/20230427-205921-aws.png','https://aws.amazon.com',25,'2023-04-27 20:59:48','bhaktimb','2023-04-27 20:59:48','bhaktimb',0),('SKLLS-000024-230427-1ba04f','DigitalOcean','/images/20230427-210003-DigitalOcean.png','https://www.digitalocean.com',26,'2023-04-27 21:00:36','bhaktimb','2023-04-27 21:00:36','bhaktimb',0),('SKLLS-000025-230427-5c67ce','Docker','/images/20230427-211426-Docker.png','https://www.docker.com',24,'2023-04-27 21:14:54','bhaktimb','2023-04-27 21:14:54','bhaktimb',0),('SKLLS-000026-230427-2de536','Heroku','/images/20230427-211605-Heroku.png','https://www.heroku.com',27,'2023-04-27 21:16:33','bhaktimb','2023-04-27 21:16:33','bhaktimb',0),('SKLLS-000027-230427-ba844d','Netlify','/images/20230427-211644-Netlify.png','https://www.netlify.com',28,'2023-04-27 21:17:14','bhaktimb','2023-04-27 21:17:14','bhaktimb',0),('SKLLS-000028-230427-889b68','Git VCS','/images/20230427-211741-GitVcs.png','https://git-scm.com',29,'2023-04-27 21:18:12','bhaktimb','2023-04-27 21:18:12','bhaktimb',0),('SKLLS-000029-230427-e4a3fc','GitHub','/images/20230427-211818-GitHub.png','https://github.com',30,'2023-04-27 21:18:44','bhaktimb','2023-04-27 21:18:44','bhaktimb',0),('SKLLS-000030-230427-8216df','React Native','/images/20230427-211856-ReactNative.png','https://reactnative.dev',6,'2023-04-27 21:19:22','bhaktimb','2023-04-27 21:19:22','bhaktimb',0);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(100) NOT NULL,
  `role_id` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_FK` (`role_id`),
  CONSTRAINT `user_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('USR-000001-230327-defe54','Bhakti Mega Buana','bhaktimb','bhaktibuana19@gmail.com','d41e56e77f8a075fbe9e6ac17d6b5574990ad973c6b10e311514767f8d74f132','2023-03-27 14:10:17','INIT','2023-03-29 19:13:20','bhaktimb','RL-000001-230327-4d1c6a',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bhakti_portfolio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-27 21:46:37
