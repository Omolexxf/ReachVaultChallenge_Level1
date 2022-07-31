'reach 0.1';

const counter=20;

const runTimer= {
 Timer: Fun([UInt], Null)
}

export const main = Reach.App(() => {
  //Alice is the owner of the fund (5000 native token)
  const A = Participant('Alice', {
    ...runTimer,
    treasury: UInt,
    getChoice: Fun([],Bool)
    
  });
  //Bob is the attacher
  const B = Participant('Bob', {
    ...runTimer,
    acceptTreasure: Fun([UInt], Null),
   
    
  });
  init();
  A.only(()=>{
    const fund= declassify(interact.treasury);
    
  });
  A.publish(fund)
   .pay(fund);
  commit();
  B.only(()=>{
    interact.acceptTreasure(fund);
    
  });
  B.publish()
 
  commit();
  each([A,B],()=>{
    interact.Timer(counter);
  })
  A.only(()=>{
    const choice=declassify(interact.getChoice());
  })
  A.publish(choice)
  if(choice){
    transfer(fund).to(A);
  } else{
    transfer(fund).to(B);
  }
  commit();
  // write your program here
  exit();
});
