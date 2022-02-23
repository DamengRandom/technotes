### Web3 Note

<b>1.</b> Web3: (initial understanding)

Web3 has a middle layer for handling communication between web3 and ethereum network (like using ganache-cli), which is called as Provider

So far my understanding of why we need Web3?? Answer: We just need to interact with smart contracts !!!

My current understanding (might be wrong): web3 is a middleman who is for integrating with ethereum network smart contract APIs, its something like we create ABI (Application Binary Interface) for javascript world then web3 provides the API to call the specific functions which has been defined in ethereum world (smart contract). 

`abi` is the middle layer between Solidity and JavaScript
<br/>


<b>2.</b> Basic Solidity types: string, bool, int (can have positive or negative numbers), uint (always positive), fixed, address

For int type, it influences the cost of gas calculation, such as int8 is better than int16, because it costs less, but in real world, you can’t easily guarantee your contract is going to be fixed as int8 or int16, right? Thus, in general, people loves using int or uint directly (a bit costly …)


Reference types: 

- fixed Array (unchangeable length), eg: int[3] —> [1,2,3]
- dynamic Array(can increase decrease length as you want), int[] —> [1,2,3]
- mapping (collection of key and value pairs -> hash pairs, like object in js), eg: mapping(bool => int)
- struct (like a class object/model object in oop), eg: 


```solidty
struct Car {
  string make;
  string model;
  uint value;
}
```
<br/>


<b>3.</b> A modifier example:

```solidity
modifier restricted() {
  require(msg.sender == manager);
  _;
}
```

This function above is easily to avoid repeat writing the same logic inside one contract more than 1 time. Thus, in this case we need to use a modifier, which looks like a helper function which helps to keep it DRY (Don’t Repeat Yourself) !!!
<br/>


<b>4.</b> storage & memory in Solidity: 

`memory` is more like keep variable data immutable .. (copy and work on new pointer)
`storage` is more like make variable data mutable .. (working on the same pointer)

`storage`: holds data between function calls, like a hard-drive !!
`memory`: temporary place to store data, like RAM !!

`storage` is like point to the original data (same location)
`memory` is copying the original data to a place called memory (different/new location)
<br/>


<b>5.</b> `mappings` in solidity solves iteration lower efficiency issue, `mapping` is designed for single value (key -> value) lookup !!!
<br/>


<b>6.</b>
