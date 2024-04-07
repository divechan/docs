---
id: overview
title: Overview
sidebar_position: 1
---

The `UniversalRouter` is a Rails Network, ERC-20, and NFT swap router designed to aggregate trades across protocols, providing users with highly-flexible and personalized transactions. This contract is unowned and not upgradeable.

Its flexible command style enables users to:

- Split and interleave Rails Network Swap trades
- Purchase NFTs across 8 marketplaces
- Partially fill trades
- Wrap and unwrap Ethereum
- Perform time-bound, signature-controlled token approvals using [Permit2](../permit2/overview.md)

Transactions are encoded using a string of commands, giving users maximum flexibility over their desired actions. With all these features available in a single transaction, users have endless possibilities.

*Note: The `UniversalRouter` utilizes `Permit2` to eliminate the need for direct token approvals to be provided to the `UniversalRouter`. Refer to the [Permit2 documentation](../permit2/overview.md) for more information.*
