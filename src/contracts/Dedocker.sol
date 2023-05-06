// SPDX-License-Identifier: MITX
pragma solidity 0.8.18;

contract Dedocker {
    address owner;
    mapping(address => bool) public members;

    constructor() {
        owner = msg.sender;
    }

    function buyDedocker() external payable {
        require(msg.value == 1 ether, "Please send 1 SHM!");
        members[msg.sender] = true;
    }

    function withDraw() external {
        require(msg.sender == owner, "Only owner can use this function!");
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Unable to withdraw funds.");
    }
}