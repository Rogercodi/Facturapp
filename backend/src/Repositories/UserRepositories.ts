// let user = {
//     name:
//     surname:
//     email:
//     dni:
//     address:
//     city:
//     cp:
//     banknumber:
// }

interface UserRepositoryI {
    name: string;
    surname: string;
    email: string;
    dni: string;
    address: string;
    city: string;
    cp: number;
    banknumber: string;


}

class UserRepository implements UserRepositoryI{
  name: string;
  surname: string;
  email: string;
  dni: string;
  address: string;
  city: string;
  cp: number;
  banknumber: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    dni: string,
    address: string,
    city: string,
    cp: number,
    banknumber: string
  ) {
    this.name = name,
    this.surname = surname,
    this.email = email,
    this.dni = dni
    this.address = address,
    this.city = city,
    this.cp = cp,
    this.banknumber = banknumber
  }

  
}
