'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements  = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const container = document.querySelector(`.movements`)
movements.map( (mov)=>{
  const color = mov > 0 ? "movements__type--deposit":"movements__type--withdrawal"
  const html = `<div class="movements__row">
          <div class="movements__type ${color}">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>`
   container.insertAdjacentHTML("afterbegin",html)
  }
)


const createusername = function(accounts){

   accounts.forEach(
    (acc) => {
    acc.username =acc.owner
    .split(" ")
    .map( (first)=> first.slice(0,1))
    .join("").toLocaleLowerCase()

})

}
  
createusername(accounts)

// const diposits = movements.filter( (number)=> number>0)
// const withdrawal= movements.filter( (mov) => mov < 0)
// console.log(withdrawal)

// const numbers = [10,10, 10, 10, 4];
// //const balance = numbers.reduce( (acc,current)=> current > acc? current:acc,numbers[0])
// const balance =numbers.reduce( function(acc,current){
//   return acc+current
// } , 0)


// console.log(balance)
const balance_value = document.querySelector(`.balance__value`)

const calculate_balance = function(mov){
 return  mov.reduce((acc,curr) => acc+curr)
}

const balance =calculate_balance(account1.movements)
balance_value.textContent=`${balance}`

///////

const summary = document.querySelector(`.summary__value--in`)
const incomeBalance = function(movment){
  return movment.filter( (mov) => mov > 0).reduce((acc,curr)=>acc+curr,0)
}

const income =  incomeBalance(account1.movements)
summary.textContent=`${income}`


const summary_out = document.querySelector(`.summary__value--out`)
const outBalance = function(movment){
  return movment.filter( (mov) => mov < 0).reduce((acc,curr)=>acc+curr,0)
}

const out =  outBalance(account1.movements)
summary_out.textContent=`${Math.abs(out)}`
// For each diposit , get interes 1.2

const interset_container = document.querySelector(`.summary__value--interest`)
const interest = function(movement){
  return movement.filter( (mov) => mov > 0 )
  .map((mov) => mov * 1/100)
  .reduce( (acc, curr) => acc+curr, 0)
}
const intersets =interest(account1.movements)
interset_container.textContent = `${intersets}`
const loginbtn = document.querySelector(`.login__btn`)

let currentAccount;
loginbtn.addEventListener("click",function(e) {
  e.preventDefault()  
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value )
  
    console.log(currentAccount)
  });
  



// Maximum value of movment array

// let max = 0;
// for( const curr of movements){

//  max = max >= curr? max : curr;

// }

//const result = movements.reduce( (max,curr)=> max >= curr? max : curr, movements[0])



// const dogAge =[1,2,4,6,7,8];
// const calcHumanAge = function(dogAge){
//   return  dogAge.map( (age)=> (age<=2 ? age*2 : 16+age*4))
//   .filter( (age) => age >= 18)
//   .reduce((acc, curr,i,arr)=> acc+curr/arr.length)

// }

// const humanage = calcHumanAge(dogAge)


// console.log(humanage);  // Output: Average human age of filtered dogs
