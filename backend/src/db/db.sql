CREATE TABLE users (
    idusuario serial not null,
    nombre VARCHAR(20),
    apellidos VARCHAR(50),
    email VARCHAR(50) unique,
    dni VARCHAR(50) unique,
    passwordu VARCHAR(30),
    numcuenta VARCHAR(30),
    domicilio VARCHAR(30),
    poblacion VARCHAR(30),
    cp INT,
    PRIMARY KEY(idusuario) 
);

INSERT INTO users (nombre, apellidos, email, dni, passwordu, numcuenta, domicilio, poblacion, cp) VALUES ('Roger', 'Test Test2', 'roger@test.com', '78787878B', '1234', 'ES3352526262525262623333','C/Esdevenidor', 'Ivars', 25260);

CREATE TABLE payers (
    idpayer serial not null,
    nombre VARCHAR(20),
    apellidos VARCHAR(50),
    email VARCHAR(50) unique,
    nif VARCHAR(50) unique,
    domicilio VARCHAR(30),
    poblacion VARCHAR(30),
    cp INT,
    PRIMARY KEY(idpayer)
);

INSERT INTO payers (nombre, apellidos, email, nif, domicilio, poblacion, cp) VALUES ('Igns', 'Test1 Test3', 'igns@test.com', '78787878B', 'C/Esdevenidor', 'Ivars', 25260);

CREATE TABLE invoices (
    idinvoice serial not null,
    base INT,
    iva INT,
    totalIva INT,
    irpf INT,
    totalIrpf INT,
    body VARCHAR(50),
    fecha DATE,
    total INT,
    idpayer INT,
    idusuario INT,
    PRIMARY KEY(idinvoice),
    FOREIGN KEY(idpayer)
    REFERENCES payers(idpayer),
    FOREIGN KEY(idusuario)
    REFERENCES users(idusuario)
);