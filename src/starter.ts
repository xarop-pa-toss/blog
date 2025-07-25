let id: number = 10
let brother: string = 'Hogan'
let isBlind: boolean = true
let x: any = 'anything you want'

let ids: number[] = [0,1,2,3,4]
let anyArr: any[] = [1, 'thing']

// Tuples
let person: [number, string, boolean] = [1, 'bruh', false]
// Tuple Array
let employee: [number, string][]

employee = [
    [1, 'ricardo'],
    [2, 'ricardo2'],
    [3, 'ricardo3'],
]

// Unions
let uid: string | number 
uid = 22
uid = '22'

// Enums
// If no assignment, it uses 0, 1, 2, etc
enum TournamentFormat {
    Single = 'A',
    Double = 'B',
    Swiss = 'C',
    RoundRobin = 'D'
}
console.log(TournamentFormat.Swiss)

// Objects
type User = {
    id: number,
    name: string
}

const user: User = {
    id: 1,
    name: 'Ricardo'
}

// Type Assertion
let cid: any = 1
let customerId = <number>cid // or customerId = cid as number
//customerId = true will throw a type error

// Functions
function addNum(x:number, y:number): number {
    return x + y
}
function log(message: string | number): void {
    console.log(message)
}
log('Hello')
log(10)
//log(false) will throw a type error

// Interfaces
interface IUser {
    id: number,
    name: string
    // Optional with ?
    age?: number
    readonly email: string
}

const user1: IUser = {
    id: 1,
    name: 'Ricardo',
    email: 'bro@mail.com'
}
// user1.email = 'bruh@mail.com' returns a readonly error

// Types can be used with primitives. Interfaces cannot, they are used with
type Point = number | string
const p1: Point = 1


// Function Interface
interface MathFunc {
    (x: number, y: number): number
}
// const add: MathFunc = (x: number, y: string) => x + y errors out because y isnt according to interface
const sub: MathFunc = (x:number, y:number) => x - y



// Classes and implementing interfaces in classes
interface PersonInterface {
    id: number,
    name: string
    register(): string
}

class Person implements PersonInterface {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    register() {
        return `Person ${this.name} is now registered!`
    }
}

const ricardo = new Person(1, "ricardo")
const lulu = new Person(2, "lulu")
console.log(ricardo, lulu)

// Extending a Class (Subclasses)
class Employee extends Person {
    position: string

    constructor(id: number, name: string, position: string) {
        super(id, name)
        this.position = position
    }
}
const emp = new Employee(5, 'Ron', 'President')
console.log(emp.register())