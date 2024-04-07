---
id: pairs
title: Pairs
---

# Overview

In the Rails Network Swap ecosystem, each liquidity pool functions as a marketplace for a pair of ERC20 tokens. Initially, when a pool is established, it starts with zero balances for both tokens, requiring an initial liquidity injection to kick-start trading activities. The initial liquidity provider sets the starting price by depositing a balanced value of the two tokens, avoiding disproportionate deposits that could lead to immediate arbitrage opportunities.

Additional liquidity providers must align their deposits with the prevailing market rate to avoid exposing their funds to arbitrage risks. If they perceive a discrepancy in the pool's price, they have the option to adjust it through arbitrage before adding their liquidity.

# Liquidity Tokens

Depositing liquidity into a pool results in the minting of liquidity tokens, which are sent to the provider's wallet. These tokens signify the provider's share of the pool, with the quantity received reflecting the extent of their contribution. For a new pool, the initial liquidity tokens issued are calculated as the square root of the product of the amounts of the two tokens deposited.

A trade in the pool incurs a 0.3% fee, charged to the trader and subsequently distributed among all liquidity providers proportionally after the trade.

Liquidity providers can redeem their share of the pool, along with accrued fees, by burning their liquidity tokens. These tokens, being tradeable, offer liquidity providers the flexibility to sell, transfer, or utilize them as they wish.

> Further exploration in advanced topics:

- [Understanding Returns](../../concepts/advanced-topics/understanding-returns)
- [Fees](../../concepts/advanced-topics/fees)

# The Role of Pools

Distinctively, Rails Network Swap operates without traditional order books, opting instead for Liquidity Pools to facilitate token swaps. Traditional finance heavily relies on order books to set asset prices and execute trades, necessitating continuous order management and sophisticated trading infrastructure, often limiting market participation to experienced traders.

However, the order book model encounters challenges in decentralized environments, requiring intermediaries for order matching and facing scalability issues with the advent of numerous tradable tokens. Liquidity Pools in Rails Network Swap leverage Ethereum's capabilities, eliminating intermediaries and fostering a more accessible and expansive token ecosystem.

Pools in Rails Network Swap are essentially smart contracts that users interact with, performing token swaps or adding liquidity through direct function calls. This design allows both end-users and developers to engage with the protocol seamlessly, enabling developers to integrate Rails Network Swap features into their applications independently of centralized platforms.

# Developer Resources

- For instructions on pooling tokens via smart contracts, consult [Providing Liquidity](../../guides/smart-contract-integration/providing-liquidity).
