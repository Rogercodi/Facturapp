CREATE TABLE users (
    idusuario serial not null,
    nombre VARCHAR(20),
    apellidos VARCHAR(50),
    email VARCHAR(50) unique,
    dni VARCHAR(50) unique,
    passwordu VARCHAR(60),
    numcuenta VARCHAR(30),
    domicilio VARCHAR(30),
    poblacion VARCHAR(30),
    cp VARCHAR(30),
    PRIMARY KEY(idusuario) 
);

INSERT INTO users (nombre, apellidos, email, dni, passwordu, numcuenta, domicilio, poblacion, cp) VALUES ('Roger', 'Test Test2', 'roger@test.com', '78787878B', '1234', 'ES3352526262525262623333','C/Esdevenidor', 'Ivars', 25260);

CREATE TABLE payers (
    idpayer serial not null,
    nombre VARCHAR(20),
    apellidos VARCHAR(50),
    email VARCHAR(50),
    nif VARCHAR(50),
    domicilio VARCHAR(30),
    poblacion VARCHAR(30),
    cp VARCHAR(10),
    idusuario INT,
    PRIMARY KEY(idpayer),
    FOREIGN KEY(idusuario)
    REFERENCES users(idusuario)
);

INSERT INTO payers (nombre, apellidos, email, nif, domicilio, poblacion, cp, idusuario) VALUES ('Igns', 'Test1 Test3', 'igns@test.com', '78787878B', 'C/Esdevenidor', 'Ivars', 25260, 2);

CREATE TABLE invoices (
    idinvoice serial not null,
    base DECIMAL,
    iva INT,
    totalIva DECIMAL,
    irpf INT,
    totalIrpf DECIMAL,
    body VARCHAR(50),
    fecha DATE,
    total DECIMAL,
    idpayer INT,
    idusuario INT,
    PRIMARY KEY(idinvoice),
    FOREIGN KEY(idpayer)
    REFERENCES payers(idpayer),
    FOREIGN KEY(idusuario)
    REFERENCES users(idusuario)
);

INSERT INTO invoices (
    base,
    iva,
    totalIva,
    irpf,
    totalIrpf,
    body,
    fecha,
    total,
    idpayer,
    idusuario) VALUES (1500, 10, 15, 10, 15, 'Concert A', '2023-05-10', 1500, 1, 2);

    UPDATE invoices SET base = 1000 ON invoices.idusuario = 1;

    SELECT * FROM invoices i LEFT JOIN payers p ON i.idpayer=p.idpayer WHERE i.idusuario = 2; 


    DELETE FROM payers p WHERE p.idpayer = 1 AND invoices WHERE invoices.idpayer = 1;


    UPDATE payers SET nombre = 'TEST', apellidos =, email =, nif =, domicilio =, poblacion =, cp = WHERE payers.idpayer = 1;