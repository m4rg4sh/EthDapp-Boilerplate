pragma solidity ^0.4.18;

contract BrownBagToken {
    address public owner;
    mapping (address => uint256) public balanceOf;
    
    function BrownBagToken () public {
        owner = msg.sender;
    }
    
    function buyToken () public payable {
        owner.transfer(msg.value);
        balanceOf[msg.sender] += msg.value;
    }
    
    function transfer (address to, uint256 amount) public {
        require(balanceOf[msg.sender] >= amount);
        balanceOf[to] += amount;
        balanceOf[msg.sender] -= amount;
    }
}
