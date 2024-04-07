---
id: signature-transfer
title: SignatureTransfer
sidebar_position: 1
---

## Overview

This contract provides two main entry points:

- `permitTransferFrom`: Used for transferring a token from an owner through signature validation.
- `permitWitnessTransferFrom`: Used for transferring a token from an owner through signature validation while validating additional data passed through as a witness.

Both functions have batched versions allowing multiple token transfers in a single transaction.

## Functions

### Single `permitTransferFrom`

Use this function to transfer a single token.

**Function Signature**

```solidity
function permitTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external
```

**Parameters**

- `permit`: Contains token permissions, nonce, and deadline.
- `transferDetails`: Contains recipient address and requested amount.
- `owner`: Signer of the permit message and token owner.
- `signature`: Signature over the permit data.

### Batched `permitTransferFrom`

Allows transferring multiple tokens from an owner in one transaction.

**Function Signature**

```solidity
function permitTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external
```

**Parameters**

- `permit`: Contains token permissions, nonce, and deadline.
- `transferDetails`: Contains details of multiple token transfers.
- `owner`: Signer of the permit message and token owner.
- `signature`: Signature over the permit data.

### Single `permitWitnessTransferFrom`

Performs a single token transfer with additional witness data validation.

**Function Signature**

```solidity
function permitWitnessTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes32 witness,
        string calldata witnessTypeString,
        bytes calldata signature
    ) external
```

**Parameters**

- `permit`: Contains token permissions, nonce, and deadline.
- `transferDetails`: Contains recipient address and requested amount.
- `owner`: Signer of the permit message and token owner.
- `witness`: Additional data to validate, used to reconstruct the signature.
- `witnessTypeString`: String defining the typed data hashed from the witness.
- `signature`: Signature over the permit data.

### Batch `permitWitnessTransferFrom`

Allows batched token transfers with witness data validation.

**Function Signature**

```solidity
function permitWitnessTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes32 witness,
        string calldata witnessTypeString,
        bytes calldata signature
    ) external
```

**Parameters**

- `permit`: Contains token permissions, nonce, and deadline.
- `transferDetails`: Contains details of multiple token transfers.
- `owner`: Signer of the permit message and token owner.
- `witness`: Additional data to validate, used to reconstruct the signature.
- `witnessTypeString`: String defining the typed data hashed from the witness.
- `signature`: Signature over the permit data.

## Nonce Schema

This contract introduces non-monotonic nonces with a `nonceBitmap`. Nonces are incremented per owner, per token, and per spender, ensuring each permit is unique.

## Security Considerations

Integrating contracts must ensure tokens are released by the correct caller and validate signatures to prevent theft scenarios, where an attacker could steal tokens through unauthorized use of signatures.
