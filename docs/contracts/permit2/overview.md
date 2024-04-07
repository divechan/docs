---
id: overview
title: Overview
sidebar_position: 1
---

Permit2 combines two contracts, [`SignatureTransfer`](./reference/signature-transfer.md) and [`AllowanceTransfer`](./reference/allowance-transfer.md), into a unified system. The `SignatureTransfer` contract facilitates signature-based transfers, bypassing token allowances and granting spend permissions only for the duration of the transaction. Conversely, the `AllowanceTransfer` contract manages token allowances, granting spenders permission to use a specified amount for a defined duration. Transfers conducted through the `AllowanceTransfer` contract are contingent upon proper permissions being set.

## Resources

For a comprehensive understanding of the Permit2 contract and its practical applications, refer to this [explanation](https://github.com/dragonfly-xyz/useful-solidity-patterns/tree/main/patterns/permit2) with examples.

## Approving Permit2

Before contracts can request users' tokens through Permit2, users must approve the Permit2 contract via the specific token contract. This is typically achieved by calling something like:

```solidity
USDC.approve(permit2Address, totalAmount);
```

To fully leverage the benefits of Permit2, users should perform a max approval on the contract, where:

```solidity
totalAmount = type(uint256).max;
```