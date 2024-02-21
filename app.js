document.getElementById('connectButton').addEventListener('click', function() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is available!');
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            // Display the first account
            const account = accounts[0];
            document.getElementById('accountAddress').textContent = account;

            // Get and display the balance
            const web3 = new Web3(window.ethereum);
            web3.eth.getBalance(account)
                .then(balance => {
                    const etherBalance = web3.utils.fromWei(balance, 'ether');
                    document.getElementById('accountBalance').textContent = `${etherBalance} ETH`;
                })
                .catch(err => {
                    console.error('Error getting balance:', err);
            });
        })
        .catch(error => {
            console.error('User denied account access', error);
        });
    } else {
        console.log('MetaMask is not available. Please install MetaMask.');
    }
});