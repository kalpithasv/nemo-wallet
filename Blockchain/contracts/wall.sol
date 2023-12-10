// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract sendReceive {
    address public owner;
    uint public TotalValue;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    //To check Balance

    function checkBal() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    //To send value

    function sendEth(uint _value, address payable to) public onlyOwner {
        require(_value > 0 gwei, "You have less gwei to send");
        to.transfer(_value);
    }

    //receive eth

    receive() external payable {
        require(msg.value > 0, "Send value more than 0");
        TotalValue += msg.value;
    }
}
