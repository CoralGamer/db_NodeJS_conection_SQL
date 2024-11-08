-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2024 a las 09:34:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sena_users`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sena`
--

CREATE TABLE `sena` (
  `Correo` varchar(60) DEFAULT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `TipoID` set('TI','CC') DEFAULT NULL,
  `Documento` varchar(255) DEFAULT NULL,
  `Pass` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sena`
--
-- DATOS FICTICIOS!!!!!!!!!
INSERT INTO `sena` (`Correo`, `Nombre`, `TipoID`, `Documento`, `Pass`) VALUES
('compras@soy.sena.edu.co', 'Michael G', 'CC', '15798796', '5482pass'),
('admin@soy.sena.edu.co', 'David H', 'CC', '555463', 'mypass1234'),
('sistemas@soy.sena.edu.co', 'Stiven R', 'CC', '4423463', 'contraseña'),
('brandon_lopez@soy.sena.edu.co', 'Brandon L', 'TI', '6758578', '6758578'),
('yadira@soy.sena.edu.co', 'Yadirax Z', 'TI', '3454852', '345ewfew'),
('jeefry_archila@soy.sena.edu.co', 'Nicolas A', 'CC', '1210938477', '12345contraseña'),
('correo2asist@sena.com', 'Paco L', 'CC', '134425', '34545'),
('admin@sena.com', 'Juanes M', 'TI', '17676425', '345rt64L5'),
('comprasDirector@sena.com', 'Manolin P', 'TI', '879877', 'Pass3145'),
('petrosky@gov.com.co', 'Petrosky U', 'CC', '876869', 'francialov');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sena`
--
ALTER TABLE `sena`
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Documento` (`Documento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
