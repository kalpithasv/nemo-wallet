// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract PushNotifierProtocol {
    
address constant public EPNS_COMM_CONTRACT_ADDRESS_FOR_SPECIFIC_BLOCKCHAIN;

constructor(address _epnsCommContractAddress) {
    EPNS_COMM_CONTRACT_ADDRESS_FOR_SPECIFIC_BLOCKCHAIN = _epnsCommContractAddress;
}
    address public channelAddress = 0x99FfBf96C9b62aeCAa44729848b0753283C8666c;

    enum NotificationType { Broadcast, Targeted, Subset }

    function notify(
        address _receiver, 
        NotificationType notificationType, 
        string memory _title, 
        string memory _body
    ) 
        public 
    {
        string memory typeString;
        
        if (notificationType == NotificationType.Broadcast) {
            typeString = "1";
        } else if (notificationType == NotificationType.Targeted) {
            typeString = "3";
        } else if (notificationType == NotificationType.Subset) {
            typeString = "4";
        }

        IPUSHCommInterface(EPNS_COMM_CONTRACT_ADDRESS_FOR_SPECIFIC_BLOCKCHAIN).sendNotification(
            channelAddress,
            _receiver,
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        typeString,
                        "+",
                        _title,
                        "+",
                        _body
                    )
                )
            )
        );
    }

    // New function to send notification on token transfer
    function notifyOnTokenTransfer(address _receiver, uint256 _amount) public {
        // Customize notification content based on your requirements
        string memory title = "Token Transfer";
        string memory body = string(abi.encodePacked("You received ", toString(_amount), " tokens."));
        notify(_receiver, NotificationType.Targeted, title, body);
    }

    // Helper function to convert uint256 to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}

