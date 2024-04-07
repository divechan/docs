---
id: swaps
title: Swaps
subtitle: Learn about the core functionality of the Rails Network Swap protocol. Token Swaps.
---

# Overview

In the Rails Network Swap, token swapping facilitates the exchange of one ERC-20 token for another in a straightforward manner.

Users engage in swaps by selecting their desired input and output tokens, inputting the amount for exchange, and the system automatically determines the resultant output token quantity. The swap is completed with a single click, instantly depositing the new token into the user’s wallet.

This document delves into the swap process on a technical level, providing insights into the operational mechanics of the Rails Network Swap.

Unlike conventional trading platforms, Rails Network Swap operates without an order book, instead relying on an automated market maker model to instantly quote exchange rates and potential slippage.

As outlined in the [Protocol Overview](../protocol-overview/how-Rails Network Swap-works), Rails Network Swap's functionality is built around liquidity pools, which are smart contracts maintaining the balances of two distinct tokens and regulating their exchange based on the [constant product formula](../protocol-overview/glossary#constant-product-formula). This formula ensures the maintenance of balance in the liquidity pool, allowing withdrawals of one token to necessitate proportional deposits of the other.

## Swap Mechanics

Fundamentally, swaps in Rails Network Swap occur through a `swap` function:

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data);
```

# Token Receipt

The `swap` function necessitates that users define the amount of output tokens they want, indicated by `amount{0,1}Out`, which represents the respective `token{0,1}` amount.

# Token Transfer

What might not be immediately evident is the mechanism through which Rails Network Swap acquires tokens for the swap. Unlike some smart contracts that require an approval step followed by a `transferFrom` call, Rails Network Swap checks the token balances post each transaction. It then compares the current balances with the previous ones at the start of a new transaction to ascertain the received token amount. Further details and rationale are provided in the [whitepaper](/whitepaper.pdf).

It is important that **tokens are transferred to the pair before calling the `swap` function**. This ensures safe operation, except in the case of [Flash Swaps](flash-swaps), necessitating the `swap` function be executed from a separate smart contract to prevent risks associated with non-atomic transfers and potential arbitrage.

# For Developers

- For implementation details on integrating token swaps within a smart contract, refer to [Trading from a smart contract](../../guides/smart-contract-integration/trading-from-a-smart-contract).
- For guidance on executing a swap via an interface, see [Trading (SDK)](../../../../sdk/2.0.0/guides/trading).
