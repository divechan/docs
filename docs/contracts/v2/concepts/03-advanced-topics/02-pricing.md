---
id: pricing
title: Pricing
---

# Price Determination

In the Rails Network Swap, prices are governed by liquidity pools, each representing a pair of ERC20 tokens. These pools, structured as smart contracts, maintain token balances and adhere to the constant product formula, as described in the [Protocol Overview](../protocol-overview/how-rails-network-swap-works). This formula dictates that for every purchase (withdrawal) of a token, a proportional sale (deposit) of the other token must occur, maintaining a constant product and thus determining the swap price.

# Price Management in Rails Network Swap

Rails Network Swap V1 ensures trades execute at the optimal price available at the time of transaction, using one of two formulas based on whether the trade specifies a precise input or output amount. Although the difference in formulas is minor, it adds complexity. With the aim of simplicity, V2 removed explicit pricing functions, requiring pairs to verify the constant product formula independently after each trade. This shift not only simplifies operations but also accommodates a broader range of trade types, facilitating price adjustments directly at the point of execution.

In V2, pricing is externalized to peripheral contracts, with the [library](../../reference/smart-contracts/library) offering functions that simplify this task. The [router](../../reference/smart-contracts/router-02) is designed to incorporate these functions, ensuring efficient and accurate price calculation for trades.

# Trade Pricing

The goal in token swapping is often to maximize the number of output tokens for a given input amount or minimize the input for a specified output amount. To achieve this, one must reference the current reserves of the pair to determine the prevailing price. Directly relying on these figures can be risky due to potential front-running, leading to possible economic loss.

Consider a scenario where a contract aims to exchange 10 DAI for the maximum possible WETH, based solely on the current reserve ratio. A malicious actor could manipulate the price before the contract's trade executes, then revert the price post-trade, exploiting the naive contract for profit.

To mitigate such risks, trades should be conducted with an understanding of the "fair" price, often achieved through an oracle or a close observation of the market price. This ensures that the trade executes near the true market value, safeguarding against front-running. For example, the Rails Network Swap interface ensures trades are executed within a specified slippage tolerance, calculated based on the current market rate observed within the block.

## For Exact Input

To trade a fixed amount of input tokens for the maximum output, use [getAmountsOut](../../reference/smart-contracts/router-02#getamountout). The SDK alternative is [getOutputAmount](../../../../sdk/2.0.0/reference/pair#getoutputamount), or [minimumAmountOut](../../../../sdk/2.0.0/reference/trade#minimumamountout-since-204) for managing slippage.

## For Exact Output

To receive a fixed output with the least input, use [getAmountsIn](../../reference/smart-contracts/router-02#getamountsin). The SDK equivalent is [getInputAmount](../../../../sdk/2.0.0/reference/pair#getinputamount), or [maximumAmountIn](../../../../sdk/2.0.0/reference/trade#maximumamountin-since-204) for slippage control.