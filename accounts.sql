-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2016 at 04:14 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leveleffort`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `username` varchar(20) COLLATE ascii_bin NOT NULL,
  `email` varchar(256) COLLATE ascii_bin NOT NULL,
  `is_gold` tinyint(1) NOT NULL,
  `register_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(32) COLLATE ascii_bin NOT NULL,
  `password` text COLLATE ascii_bin NOT NULL,
  `completed_tasks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`username`, `email`, `is_gold`, `register_timestamp`, `user_id`, `password`, `completed_tasks`) VALUES
('Jon', 'WorobeyJL1@gcc.edu', 0, '2016-11-24 02:58:39', '5836575fb37af', '$2y$10$4jnpXDO7p2n85/BRupRVAO0swcVxtoQjyv4eABKpMlRYOP3ad1Cxq', 0),
('Goldie', 'Goldie@gmail.com', 1, '2016-11-24 03:10:05', '58365a0d97fce', '$2y$10$UYpv6Q4dgVmloslbuBXMXOOeHbJjhUgapT9RmqbD2wZpkuuZyh6T2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_id` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
