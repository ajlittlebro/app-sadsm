CREATE TABLE `CLIENTE`(
  `idCliente` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Correo electronico` VARCHAR(50) NOT NULL,
  `Telefono` INT(10) NOT NULL,
  `Direccion` VARCHAR(50) NOT NULL
);

INSERT INTO CLIENTE(Nombre, Apellido, `Correo electronico`, Telefono, Direccion) VALUES
  ('Cliente', 'Ejemplo', 'cliente@ejemplo.com', 1234567890, 'Direccion Cliente Ejemplo');

CREATE TABLE `EMPLEADO`(
  `idEmpleado` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Correo` VARCHAR(50) NOT NULL,
  `Telefono` INT(10) NOT NULL
);

INSERT INTO EMPLEADO(Nombre, Apellido, Correo, Telefono) VALUES
  ('Empleado', 'Ejemplo', 'empleado@ejemplo.com', 1234567890);

CREATE TABLE `SALON`(
  `idSalon` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Capacidad` int(10) NOT NULL
);

INSERT INTO SALON(Nombre, Capacidad) VALUES
  ('Salon Ejemplo', 500);

CREATE TABLE `EVENTO`(
  `idEvento` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripccion` VARCHAR(90) NOT NULL,
  `Fecha` DATE NOT NULL,
  `Hora` TIME(0) NOT NULL,
  `Lugar` VARCHAR(50) NOT NULL,
  `Salon` VARCHAR(50) NOT NULL
);

INSERT INTO EVENTO(Nombre, Descripccion, Fecha, Hora, Lugar, Salon) VALUES
  ('Evento Ejemplo', 'Descripccion de evento ejemplo', '2024-05-01', '09:10:00', 'Lugar de Evento Ejemplo', 'Salon Ejemplo');

CREATE TABLE `PAQUETE`(
  `idPaquete` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripccion` VARCHAR(90) NOT NULL,
  `Precio` INT(15) NOT NULL
);

INSERT INTO PAQUETE(Nombre, Descripccion, Precio) VALUES
  ('Paquete Ejemplo', 'Descripccion del Paquete Ejemplo', 1500);

CREATE TABLE `PAGO`(
  `idPago` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Fecha` DATE NOT NULL,
  `Monto` DECIMAL(10,2) NOT NULL,
  `Forma de Pago` VARCHAR(50) NOT NULL
);

INSERT INTO PAGO(Fecha, Monto, `Forma de Pago`) VALUES
  ('2024-05-01', 1500.00, 'Ejemplo Forma de Pago');

CREATE TABLE `COTIZACION`(
  `idCot` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idCliente` INT(10) NOT NULL,
  FOREIGN KEY(idCliente) REFERENCES CLIENTE(idCliente),
  `idEvento` INT(10) NOT NULL,
  FOREIGN KEY(idEvento) REFERENCES EVENTO(idEvento),
  `Fecha` DATE NOT NULL,
  `Monto` DECIMAL(10,2) NOT NULL
);

INSERT INTO COTIZACION(idCliente, idEvento, Fecha, Monto) VALUES
  (1, 1, '2024-05-01', 1500.00);

CREATE TABLE `HISTORIAL`(
  `idHist` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idEvento` INT(10) NOT NULL,
  FOREIGN KEY(idEvento) REFERENCES EVENTO(idEvento),
  `Fecha` DATE NOT NULL,
  `Asistencia` VARCHAR(50) NOT NULL,
  `Pagos` DECIMAL(10,2) NOT NULL
);

INSERT INTO HISTORIAL(idEvento, Fecha, Asistencia, Pagos) VALUES
  (1, '2024-05-01', 'Todos', 1.00);

CREATE TABLE `DETALLEPC`(
  `idCliente` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Telefono` INT(10) NOT NULL,
  `idPago` INT(10) NOT NULL,
  FOREIGN KEY(idPago) REFERENCES PAGO(idPago),
  `Monto` DECIMAL(10,2) NOT NULL,
  `Forma de Pago` VARCHAR(50) NOT NULL
);

INSERT INTO DETALLEPC(Nombre, Apellido, Telefono, idPago, Monto, `Forma de Pago`) VALUES
  ('Nombre', 'Ejemplo', 1234567890, 1, 1500.00, "Forma de pago Ejemplo");
