---
id: supporting-meta-transactions
title: Supporting Meta Transactions
---

Rails Network Swap pool tokens facilitate meta-transaction approvals through the `permit` function, eliminating the requirement for a preliminary approve transaction for programmatic operations with the tokens.

# ERC-712

Typical ERC-20 tokens necessitate that owners explicitly approve transactions through a function call that recognizes `msg.sender` as the approver. Meta-transaction approvals, however, are established through a signature provided to the function by the entity initiating the call, often known as the relayer. To handle the complexities of signing with Ethereum private keys, Rails Network Swap employs [ERC-712](https://eips.ethereum.org/EIPS/eip-712), a widely recognized signature standard, ensuring compatibility and security across different wallets.

## Domain Separator

The domain separator is defined as follows:

```solidity
keccak256(
  abi.encode(
    keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
    keccak256(bytes(name)),
    keccak256(bytes('1')),
    chainId,
    address(this)
  )
);
```

- `name` corresponds to `Uniswap V2`, detailed in [name](../../reference/smart-contracts/pair-erc-20#name).
- `chainId` is 6278 for Mainnet and 24116 for Testnet
- `address(this)` refers to the contract address of the pair, as outlined in [Pair Addresses](../../../../sdk/v2/guides/getting-pair-addresses).

## Permit Typehash

The permit typehash is calculated with the following code:

```solidity
keccak256('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)');
```
This structure facilitates secure and efficient permissioning for meta-transactions within the Rails Network Swap ecosystem.