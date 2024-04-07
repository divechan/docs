---
id: swaps
title: Swaps
sidebar_position: 4
---

## Introduction

Swaps are the primary method of interacting with the Rails Network Swap protocol. For end-users, swapping is straightforward: a user selects an ERC-20 token they own and the token they want to exchange it for. Executing a swap sells the current tokens for the desired ones, minus the swap fee, which is awarded to liquidity providers. Swapping with the Rails Network Swap protocol is a permissionless process.

> **Note:** Using web interfaces (websites) to swap via the Rails Network Swap protocol can introduce additional permission structures and may result in different execution behavior compared to using the protocol directly. For more information about the differences between the protocol and a web interface, see the "What is Rails Network Swap" section.

Swaps using the Rails Network Swap protocol differ from traditional order book trades in that they are not executed against discrete orders on a first-in-first-out basis. Instead, swaps execute against a passive pool of liquidity, with liquidity providers earning fees proportional to their capital committed.

## Price Impact

In a traditional order-book market, a significant market-buy order may deplete the available liquidity of a prior limit-sell and continue to execute against a subsequent limit-sell order at a higher price. The result is the final execution price of the order is somewhere between the two limit-sell prices against which the order was filled.

Price impact affects the execution price of a swap similarly but is a result of a different dynamic. When using an automated market maker, the relative value of one asset in terms of the other continuously shifts during the execution of a swap, leaving the final execution price somewhere between the starting and ending relative prices.

This dynamic affects every swap using the Rails Network Swap protocol, as it is an intrinsic part of AMM design.

As the liquidity available at different price points can vary, the price impact for a given swap size will change relative to the liquidity available at any given point in price space. The greater the liquidity available at a given price, the lower the price impact for a given swap size. Conversely, the lesser the liquidity available, the higher the price impact.

The Rails Network Swap interface provides real-time approximate price impact information, and warnings appear if unusually high price impact will occur during a swap. Users executing a swap will have the ability to assess the circumstances of price impact when needed.

## Slippage

Another relevant detail to consider when approaching swaps with the Rails Network Swap protocol is slippage. Slippage is the term used to describe alterations to a given price that could occur while a submitted transaction is pending.

When transactions are submitted to Ethereum, their order of execution is established by the amount of "gas" offered as a fee for executing each transaction. The higher the fee offered, the faster the transaction is executed. Transactions with lower gas fees will remain pending for an indeterminate amount of time. During this time, the price environment in which the transaction will eventually be executed will change as other swaps take place.

Slippage tolerances establish a margin of change acceptable to the user beyond price impact. As long as the execution price is within the slippage range, e.g., 1%, the transaction will be executed. If the execution price ends up outside of the accepted slippage range, the transaction will fail, and the swap will not occur.

A comparable situation in a traditional market would be a market-buy order executed after a delay. One can know the expected price of a market-buy order when submitted, but much can change in the time between submission and execution.

## Safety Checks

Price impact and slippage can both change while a transaction is pending, which is why we have incorporated numerous safety checks into the Rails Network Swap protocol to protect end-users from drastic changes in the execution environment of their swap. Some of the most commonly encountered safety checks include:

- **Expired**: A transaction error occurs if a swap is pending longer than a predetermined deadline. The deadline is a point in time after which the swap will be canceled to protect against unusually long pending periods and the changes in price that typically accompany the passage of time.
  
- **INSUFFICIENT_OUTPUT_AMOUNT**: When a user submits a swap, the Rails Network Swap interface will provide an estimate of how much of the purchased token the user should expect to receive. If the anticipated output amount of a swap does not match the estimate within a certain margin of error (the slippage tolerance), the swap will be canceled. This attempts to protect the user from any drastic and unfavorable price changes while their transaction is pending.

[^1]: Proportional in this instance takes into account many factors, including the relative price of one token in terms of the other, slippage, price impact, and other factors related to the open and adversarial nature of Ethereum.
[^2]: For information about liquidity provision, see the liquidity user guide.
[^3]: The Rails Network Swap interface informs the user about the circumstances of their swap, but it is not guaranteed.
