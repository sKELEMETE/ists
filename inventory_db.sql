-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 04:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_log`
--

INSERT INTO `audit_log` (`log_id`, `user_id`, `action`, `description`, `timestamp`) VALUES
(1, NULL, 'Update Product', 'Updated product otenan (16)', '2025-11-26 00:41:16'),
(2, 1, 'Login', 'Admin111 logged in', '2025-11-26 00:42:55'),
(3, NULL, 'Create User', 'Created user Admin1 (Admin)', '2025-11-26 01:07:46');

-- --------------------------------------------------------

--
-- Table structure for table `incident_report`
--

CREATE TABLE `incident_report` (
  `incident_id` int(11) NOT NULL,
  `reportedby_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Resolved') DEFAULT 'Pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incident_report`
--

INSERT INTO `incident_report` (`incident_id`, `reportedby_id`, `description`, `status`, `created_at`) VALUES
(1, 12, 'Herro!', 'Pending', '2025-11-27 04:51:08'),
(2, 12, 'Heraasdnqwehnfwcdgnwqdscamtngew vfcxq,c gewdc', 'Resolved', '2025-11-27 04:52:27'),
(3, 12, 'asdwqdwqxsa', 'Resolved', '2025-11-27 05:04:52'),
(4, 12, 'ahsdahcccccc', 'Resolved', '2025-11-27 05:13:24'),
(5, 12, 'asdqewdsxa', 'Pending', '2025-11-27 05:14:19'),
(6, 12, 'asd2321313', 'Pending', '2025-11-27 05:14:23'),
(7, 12, 'axac11231', 'Resolved', '2025-11-27 05:14:26'),
(8, 12, 'asasd13', 'Pending', '2025-11-27 05:14:30'),
(9, 12, '1231easd', 'Resolved', '2025-11-27 05:14:35'),
(10, 12, '1313123123123123', 'Resolved', '2025-11-27 05:14:39'),
(11, 12, 'zxczxcz', 'Resolved', '2025-11-27 05:14:41'),
(12, 12, 'Putang inamo!!', 'Resolved', '2025-12-02 20:59:42'),
(13, 13, 'yawa', 'Pending', '2025-12-02 21:25:31'),
(14, 13, 'yawa', 'Pending', '2025-12-02 21:25:39'),
(15, 5, 'otenen', 'Pending', '2025-12-02 21:26:42'),
(16, 19, 'IKADUHA NA TOPLOK', 'Pending', '2025-12-02 22:35:25'),
(17, 19, 'isa ra ka otenen dapat, pero duha ang na record', 'Pending', '2025-12-02 22:44:14');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity_in_stock` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `category`, `price`, `quantity_in_stock`, `created_at`, `updated_at`) VALUES
(11, '19981', 'cat 1', 12.00, 20, '2025-11-24 21:37:35', '2025-11-24 21:37:35'),
(12, 'pause', 'cat 2', 233.00, 255, '2025-11-24 22:25:14', '2025-11-24 22:25:14'),
(15, 'sinep', 'cat 2', 1232.00, 10, '2025-11-25 17:09:58', '2025-12-02 20:59:28'),
(16, 'otenan', 'cat 3', 144.00, 254, '2025-11-25 18:15:40', '2025-12-02 22:34:56'),
(17, 'otenen', 'cat 1', 123.00, 114, '2025-11-26 13:12:23', '2025-12-02 22:47:23'),
(18, 'latbilatbilatbi', 'latbilatbilatbi', 1222.00, 0, '2025-11-27 00:59:40', '2025-12-02 21:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `report_type` varchar(50) DEFAULT NULL,
  `generated_by` int(11) DEFAULT NULL,
  `generated_date` datetime DEFAULT current_timestamp(),
  `total_sales` decimal(10,2) DEFAULT NULL,
  `total_products_sold` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `sale_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sale_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`sale_id`, `user_id`, `total_amount`, `sale_date`) VALUES
(3, 1, 2400.00, '2025-11-24 22:27:56'),
(4, 12, 499.00, '2025-11-26 14:37:06'),
(6, 12, 5988.00, '2025-11-26 14:58:32'),
(7, 12, 240.00, '2025-11-26 15:00:02'),
(8, 12, 48.00, '2025-11-26 15:04:00'),
(9, 12, 19008.00, '2025-11-26 15:05:08'),
(10, 12, 1497.00, '2025-11-26 22:37:39'),
(12, 12, 45214.00, '2025-11-27 01:00:17'),
(13, 12, 3696.00, '2025-12-02 20:59:28'),
(14, 12, 1222.00, '2025-12-02 21:10:25'),
(15, 12, 1222.00, '2025-12-02 21:10:26'),
(18, 19, 123.00, '2025-12-02 22:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `sales_detail`
--

CREATE TABLE `sales_detail` (
  `sales_details_id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_detail`
--

INSERT INTO `sales_detail` (`sales_details_id`, `sale_id`, `product_id`, `quantity`, `subtotal`) VALUES
(3, 3, 13, 12, 2400.00),
(4, 4, 14, 1, 499.00),
(6, 6, 14, 12, 5988.00),
(7, 7, 9, 20, 240.00),
(8, 8, 9, 4, 48.00),
(9, 9, 16, 132, 19008.00),
(10, 10, 14, 3, 1497.00),
(12, 12, 18, 37, 45214.00),
(13, 13, 15, 3, 3696.00),
(14, 14, 18, 1, 1222.00),
(15, 15, 18, 1, 1222.00),
(19, 18, 17, 1, 123.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `role` enum('Admin','Cashier') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `fullname`, `role`, `created_at`, `updated_at`) VALUES
(5, 'C_Balantilanto', 'cashier1', 'Ariel Jay B. Mantilan', 'Cashier', '2025-11-25 01:18:34', '2025-11-25 01:18:34'),
(10, 'admin1', 'admin', 'Default Administrator', 'Admin', '2025-11-26 01:13:26', '2025-11-26 01:13:26'),
(11, 'admin2', 'admin', 'admin2', 'Admin', '2025-11-26 03:00:40', '2025-11-26 03:00:40'),
(12, 'Cashier1', 'cashier', 'Test Cashier', 'Cashier', '2025-11-26 03:05:51', '2025-11-26 03:05:51'),
(13, 'admin', 'admin', 'Administrator', 'Admin', '2025-11-27 12:56:43', '2025-11-27 12:56:43'),
(14, 'cashier', '$2b$08$fzxDh.Mk4vqHbugp1kaEhu8SAxMCvlTKDuGTTBpLf/f3u7UWjhEp6', 'cashier', 'Cashier', '2025-12-02 21:59:54', '2025-12-02 21:59:54'),
(19, 'dodon', 'erat', 'dondon erat', 'Cashier', '2025-12-02 22:33:46', '2025-12-02 22:33:46'),
(21, 'admi', '$2b$10$0tJIauz0hIZjSjC7g2.lP.Kez3siW09FEp/GSQmHZsCyLAVaIWYIa', 'admi', 'Admin', '2025-12-02 23:06:47', '2025-12-02 23:06:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `incident_report`
--
ALTER TABLE `incident_report`
  ADD PRIMARY KEY (`incident_id`),
  ADD KEY `reportedby_id` (`reportedby_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `generated_by` (`generated_by`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sales_detail`
--
ALTER TABLE `sales_detail`
  ADD PRIMARY KEY (`sales_details_id`),
  ADD KEY `sale_id` (`sale_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `incident_report`
--
ALTER TABLE `incident_report`
  MODIFY `incident_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sales_detail`
--
ALTER TABLE `sales_detail`
  MODIFY `sales_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
