---
id: fees
title: Fees
---

## Fees for Liquidity Providers

A swapping fee of **0.3%** is charged for token exchanges, which is distributed among the liquidity providers according to their liquidity contribution. 

This fee is instantly added to the liquidity pool, enhancing the value of the liquidity tokens. It serves as a reward for liquidity providers, proportional to their pool ownership. The collection of these fees is facilitated through the burning of liquidity tokens, thereby withdrawing a corresponding portion of the pool's reserves.

As fees contribute to the liquidity pools, the pool's invariant, or the product of the pools' reserves, increases after each trade, representing the ratio of `token0_pool / token1_pool` from the conclusion of the preceding trade.

For assessing returns, numerous community-built tools are available, and further insights can be found in the [LP returns](../advanced-topics/understanding-returns) section of the documentation.

## Protocol Fees

Currently, the protocol imposes no fees, but a future implementation of a 0.05% fee per trade is conceivable.

## Calculation of Protocol Charges

A potential future scenario involves a protocol-level fee of 0.05% per trade, which would constitute one-sixth (approximately 16.67%) of the 0.30% swapping fee. This fee would be applicable if the [feeTo](../../reference/smart-contracts/factory/#feeto) address is set to a value other than `address(0)` (`0x0000000000000000000000000000000000000000`), signifying that `feeTo` is designated to receive this fee.

While this would not alter the trading fees for users, it would impact the distribution to liquidity providers.
