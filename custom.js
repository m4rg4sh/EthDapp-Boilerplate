$(window).on('load', function() {
    
    var contractAddress = "0xca7750fb64199206274e9fd004f4eb00f3f01776"; // in Ropsten testnet!
    var contractAbi = [
        {
            "constant": false,
            "inputs": [],
            "name": "buyToken",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I has web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'I doesn\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }
    
    // create instance of contract object that we use to interface the smart contract
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
    contractInstance.balanceOf(web3.eth.defaultAccount, function(error, balance) {
        if (error) {
            var errorMsg = 'error reading balance from smart contract: ' + error;
            $('#content').text(errorMsg);
            console.log(errorMsg);
            return;
        }
        $('#content').text('Amount of Tokens: ' + web3.fromWei(balance, 'ether').toString(10));
    });
    
    $('#buyToken').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var newAmount = $('#amount').val();
        contractInstance.buyToken({from: web3.eth.defaultAccount, value: web3.toWei(newAmount, "ether")}, function(error, txHash) {
            if (error) {
                var errorMsg = 'error buying Token: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('sent buying transaction to blockchain, transaction hash: ' + txHash);
        });
    });

    $('#transferToken').on('submit', function(e) {
        e.preventDefault(); // cancel the actual submit
        var newTransferAmount = $('#transferamount').val();
        contractInstance.transfer($('#to').val(), web3.toWei(newTransferAmount, "ether"), function(error, txHash) {
            if (error) {
                var errorMsg = 'error transfering Token: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('sent transfer transaction to blockchain, transaction hash: ' + txHash);
        });
    });

});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
