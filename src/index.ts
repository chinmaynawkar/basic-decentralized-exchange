import express from 'express';

const app = express();
app.use(express.json());

let ETH_Balance = 200;
//if you think the price of ETH won't change in few years you can create pool here
//else will get impermanent loss
let USDC_Balance = 700000; // the price of USDC/USDT mainly doesn't change.

app.get('/add-liquidity', (req, res) => {
    res.send('Hello World!');
});

//when there are more buyers than sellers price will go up
app.post('/buy-asset', (req, res) => {
    const qty = req.body.qty;
    const updatedEthQty = ETH_Balance - qty;
    const updatedUsdcBalance = ETH_Balance * USDC_Balance / updatedEthQty;
    const paidAmount = updatedUsdcBalance - USDC_Balance;

    ETH_Balance = updatedEthQty;
    USDC_Balance = updatedUsdcBalance;

    res.json({
        message: `You paid  ${paidAmount} USDC for ${qty} ETH`,
    })
});

//when there are more sellers than buyers price will go down
app.post('/sell-asset', (req, res) => {
    const qty = req.body.qty;
    const updatedEthQty = ETH_Balance + qty;
    const updatedUsdcBalance = ETH_Balance * USDC_Balance / updatedEthQty;
    const gotAmount = USDC_Balance - updatedUsdcBalance;

    ETH_Balance = updatedEthQty;
    USDC_Balance = updatedUsdcBalance;

    res.json({
        message: `You received ${gotAmount} USDC for ${qty} ETH`,
});

});

app.get('/quote', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
