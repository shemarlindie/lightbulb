-- phpMyAdmin SQL Dump
-- version 4.4.13.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 28, 2015 at 09:22 PM
-- Server version: 5.6.27-0ubuntu1
-- PHP Version: 5.6.11-1ubuntu3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lightbulb75`
--

-- --------------------------------------------------------

--
-- Table structure for table `appdeas`
--

CREATE TABLE IF NOT EXISTS `appdeas` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `date_created` bigint(20) unsigned NOT NULL,
  `date_updated` bigint(20) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appdeas`
--

INSERT INTO `appdeas` (`id`, `title`, `description`, `status`, `date_created`, `date_updated`) VALUES
(83, 'V75 Mobile App', 'Will facilitate sharing (among other things) between member of the V75 Network.\nâ€œWe CREATE Software.â€', 0, 1448758083, 1448758083),
(84, 'Snappcorder', 'Audio, meet visual.\nSimple Capture. Visual Seek. Be Creative.', 2, 1448758102, 1448759019);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appdeas`
--
ALTER TABLE `appdeas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appdeas`
--
ALTER TABLE `appdeas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=86;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
