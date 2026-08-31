// let myName: string = "JJ";

// console.log(myName);

// class Person {
//     firstName: string = ""
//     lastName: string = ""
//     age: number = 0
// }

// const person1 = new Person();
// person1.firstName = "JJ"
// person1.lastName = "Boy"
// person1.age = 31

// console.log(person1);

interface Vehicle {
    manufacturer: string
    model: string
    color: string
    year: number
}

class Cars {
    vehicle: Vehicle[];

    constructor(
        vehicle: Vehicle[]
    ){
        this.vehicle = vehicle;
    }

    getCar() {
        console.log(this.vehicle);
    }
}

const cars = new Cars([
    { manufacturer: "Kia", model: "Cerato", color: "Gray", year: 2012 }
])

cars.getCar();