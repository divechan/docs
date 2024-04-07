---
id: trading-from-a-smart-contract
title: Implement a Swap
---

Executing trades through a smart contract necessitates the use of an external price feed to prevent potential front-running and consequent losses.

# Router Utilization

To execute token swaps securely, employing the [router](../../reference/smart-contracts/router-02) is recommended, as it offers multiple methods for conducting safe exchanges between various assets. Each method corresponds to a specific swapping scenario, either for a precise amount of STEAMX/tokens or vice versa.

Prior to executing a swap, it’s crucial to determine the safety parameters, like the minimum amount to receive on selling or the maximum payable amount for a purchase, using an external price feed.

Moreover, ensuring the contract has sufficient STEAMX/tokens for the swap and has authorized the router to access these tokens is essential.

_For a detailed discussion on price determination, refer to the [Pricing](../../concepts/advanced-topics/pricing#pricing-trades) section._

# Execution Example

Consider swapping 50 USDC for the maximum possible STEAMX through your smart contract.

## transferFrom

To initiate, the contract must hold 50 USDC, achievable by invoking `transferFrom` on USDC with `msg.sender` as the owner:

```solidity
uint amountIn = 50 * 10 ** USDC.decimals();
require(USDC.transferFrom(msg.sender, address(this), amountIn), 'Transfer from failed.');
```

## approve

Post acquisition of 50 USDC, authorization for the [router](../../reference/smart-contracts/router-02) to use this USDC is required:

```solidity
require(USDC.approve(address(UniswapV2Router02), amountIn), 'Approval failed.');
```

## swapExactTokensForETH

Subsequently, you can proceed with the swap:

```solidity
// amountOutMin must be ascertained via an oracle
address[] memory path = new address[](2);
path[0] = address(USDC);
path[1] = UniswapV2Router02.WETH();
UniswapV2Router02.swapExactTokensForETH(amountIn, amountOutMin, path, msg.sender, block.timestamp);
```

# Safety Measures

In the adversarial setting of the Rails Network, contracts lacking robust safety mechanisms are prone to exploitation. Assuming that the prevailing swap price on Rails Network Swap is equitable without safety validations exposes the contract to potential market manipulations. Malicious entities can perform 'sandwich' attacks, where they manipulate the market price before and after a contract’s trade, leading to unfavorable trading conditions and profiteering at the trader's expense.