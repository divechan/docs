---
id: providing-liquidity
title: Providing Liquidity
---

# Adding Liquidity

## Overview

When adding liquidity to a pool via a smart contract, a crucial consideration is the risk of arbitrage if the deposited tokens do not match the current reserve ratio of the pool. For instance, depositing at a different ratio than the pool's existing x:y (e.g., depositing at a 5:2 ratio in a 10:2 pool) will adjust the price and potentially lead to arbitrage, as the pool tokens received will reflect the actual value contributed at the correct ratio. To prevent losses, liquidity should be provided at the prevailing market price, a process that can be managed effectively.

## Utilizing the Router

The [router](../../reference/smart-contracts/router-02) offers straightforward functions for adding liquidity, whether dealing with ERC-20/ERC-20 pairs or involving WETH, through the `addLiquidity` and `addLiquidityETH` methods, respectively.

When using these methods, the liquidity provider must have a clear understanding of the current market price, reflected in the `amount*Desired` parameters. Generally, the fair market price aligns with the existing reserve ratio due to the effect of arbitrage. Thus, adding liquidity requires calculating the appropriate amount of each token based on the current reserve ratio.

It’s critical to perform this price calculation before executing the transaction because relying on the in-transaction reserve ratio for price determination is unsafe due to potential manipulations.

The transaction should also include `amount*Min` parameters to indicate the minimum acceptable amounts reflecting the provider's tolerance for price fluctuation, ensuring the liquidity is added within an acceptable price range.

Before proceeding with the transaction, verify that your contract has sufficient token balances for the `amount*Desired` and has authorized the router to access these tokens for the liquidity addition.
