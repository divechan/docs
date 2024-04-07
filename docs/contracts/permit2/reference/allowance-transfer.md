---
id: allowance-transfer
title: AllowanceTransfer
sidebar_position: 2
---

## Overview

The main functionalities of this contract include:

- `approve`: Used when token permissions are set without signature validation.
- `permit`: Used when token permissions are set with signature validation.
- `transferFrom`: Used to transfer tokens when appropriate permissions are granted.

## Functions

### `approve`

**Function Signature**

```solidity
function approve(address token, address spender, uint160 amount, uint48 expiration) external
```

**Parameters**

- `token`: Address of the token to approve.
- `spender`: Address of the spender to approve.
- `amount`: Approved amount of the token. `type(uint160).max` denotes an unlimited allowance.
- `expiration`: Timestamp when the approval expires. `0` expires the permissions at `block.timestamp`.

### Single `permit`

**Function Signature**

```solidity
function permit(address owner, PermitSingle memory permitSingle, bytes calldata signature) external;
```

**Parameters**

- `owner`: Address of the token's owner.
- `permitSingle`: Structure containing permit data.
- `signature`: Signature over the permit data.

### Batched `permit`

**Function Signature**

```solidity
function permit(address owner, PermitBatch memory permitBatch, bytes calldata signature) external;
```

**Parameters**

- `owner`: Address of the token's owner.
- `permitBatch`: Structure containing permit data for multiple token allowances.
- `signature`: Signature over the permit data.

### Single `transferFrom`

**Function Signature**

```solidity
function transferFrom(address from, address to, uint160 amount, address token) external;
```

**Parameters**

- `from`: Address to transfer the token from.
- `to`: Address of the recipient.
- `amount`: Amount of the token to transfer.
- `token`: Address of the token to be transferred.

### Batched `transferFrom`

**Function Signature**

```solidity
function transferFrom(AllowanceTransferDetails[] calldata transferDetails) external;
```

**Parameters**

- `transferDetails`: Details of token transfers, including owner, recipient, amount, and token address.

## Nonce Schema

Nonces are used to prevent replay attacks of signatures. They are incremented per owner, per token, and per spender, ensuring that two different permits signed at the same time with the same nonces won't cancel each other out.

## Security Considerations

Integrating contracts need to perform valid safety checks on the caller and provide correct addresses for the `from` argument in transfer calls. Additionally, all amounts on the `AllowanceTransfer` contract are of type `uint160`, so integrating contracts must safely downcast if necessary.
