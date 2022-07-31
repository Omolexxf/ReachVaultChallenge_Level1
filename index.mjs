import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);


const startingBalance = stdlib.parseCurrency(10);

const  accBob  =
  await stdlib.newTestAccount( startingBalance);
console.log('Hello, Alice and Bob!');
const accAlice= await stdlib.newTestAccount(stdlib.parseCurrency(6000))
console.log('Launching the treasury...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
const getBalance = async (x)=> await stdlib.formatCurrency(await stdlib.balanceOf(x))

const choiceArray= ["I am not here", "I am still here"]
const AliceBalanceB4= await getBalance(accAlice)
const BobBalanceB4= await getBalance(accBob)

console.log(`Alice balance is ${AliceBalanceB4}`)
console.log(`Bob balance is ${BobBalanceB4}`)
const runTimer= ()=>({
  Timer:(time)=>{
    console.log("The timer:")
    console.log(parseInt(time))
  }
})

console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
     ...runTimer(),
     treasury: stdlib.parseCurrency(5000),
     getChoice: ()=>{
      const choice=Math.floor(Math.random()*2)
      console.log(`Alice's choice is ${choiceArray[choice]}`)
      return (choice==0? false: true)
     }
    
    // implement Alice's interact object here
  }),
 

  
  backend.Bob(ctcBob, {
    ...runTimer(),
    acceptTreasure: (amt)=>{
      console.log(`accepted ${stdlib.formatCurrency(amt)}`)
    },
  
 
    // implement Bob's interact object here
  }),
]);
const after= await getBalance(accAlice)
console.log(`Alice's balance moved from ${AliceBalanceB4} to: ${after}`)
const afters=  await getBalance(accBob)
console.log(`Bob's balance moved from ${BobBalanceB4} to : ${afters}`)

console.log("exiting...")

console.log('Goodbye, Alice and Bob!');
