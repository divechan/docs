---
id: technical-reference
title: Technical Reference
sidebar_position: 1
---

## Functions

All transactions to the `UniversalRouter` are processed through the `UniversalRouter.execute` functions:

- `execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline)`
- `execute(bytes calldata commands, bytes[] calldata inputs)`

The first function allows setting a transaction deadline. If the `block.timestamp` surpasses the provided `deadline`, the transaction will revert. Otherwise, both functions execute identically.

These functions operate like a simplified virtual machine (VM). They accept a list of commands and corresponding inputs, executing them in the specified order.

## Command Structure

The first parameter (`bytes calldata commands`) is a list of commands for the contract to execute, ordered as intended. Each command is encoded in a single byte, divided as follows:

| 0  | 1 2 | 3 4 5 6 7 |
| :- | :-- | :-------- |
| f  | r   | command   |

### `f`
A single bit flag indicating whether the command can revert independently without causing the entire transaction to fail:
- If `f` is `0` (false) and the command reverts, the entire transaction fails, and subsequent commands are not executed.
- If `f` is `1` (true) and the command reverts, the transaction proceeds, enabling partial fills. If using this flag, ensure to include further commands to utilize any leftover funds in the `UniversalRouter` contract.

### `r`
Two unused bits reserved for future use. These bits can be set to `0` to save gas, with any provided values ignored. Future versions of the `UniversalRouter` might utilize these bits for additional functionalities.

### `command`
A 5-bit unique identifier for the command to execute.

Commands not defined at present will cause the transaction to revert with `InvalidCommandType`.

The table below lists the complete set of commands:

| Command | Value                                                                                    |
| :------ | :--------------------------------------------------------------------------------------- |
| `0x02`  | [PERMIT2_TRANSFER_FROM](#permit2_transfer_from)                                           |
| `0x03`  | [PERMIT2_PERMIT_BATCH](#permit2_permit_batch)                                             |
| `0x04`  | [SWEEP](#sweep)                                                                           |
| `0x05`  | [TRANSFER](#transfer)                                                                     |
| `0x06`  | [PAY_PORTION](#pay_portion)                                                               |
| `0x08`  | [V2_SWAP_EXACT_IN](#v2_swap_exact_in)                                                     |
| `0x09`  | [V2_SWAP_EXACT_OUT](#v2_swap_exact_out)                                                   |
| `0x0a`  | [PERMIT2_PERMIT](#permit2_permit)                                                         |
| `0x0b`  | [WRAP_ETH](#wrap_eth)                                                                     |
| `0x0c`  | [UNWRAP_WETH](#unwrap_weth)                                                               |
| `0x0d`  | [PERMIT2_TRANSFER_FROM_BATCH](#permit2_transfer_from_batch)                               |

### Command Details

Each command is followed by specific parameters:

#### `PERMIT2_TRANSFER_FROM`

- `address`: Token to fetch from Permit2
- `address`: Recipient of the fetched tokens
- `uint256`: Amount of tokens to fetch

The tokens are fetched from the `msg.sender` of the transaction.

#### `PERMIT2_PERMIT_BATCH`

- `IAllowanceTransfer.PermitBatch`: PermitBatch struct detailing Permit2 permits to execute
- `bytes`: Signature for Permit2

The signer of the permits must be the `msg.sender` of the transaction.

#### `SWEEP`

- `address`: ERC20 token to sweep (or Constants.STEAMX for STEAMX)
- `address`: Recipient of the sweep
- `uint256`: Minimum tokens to receive from the sweep

#### `TRANSFER`

- `address`: ERC20 token to transfer (or Constants.STEAMX for STEAMX)
- `address`: Recipient of the transfer
- `uint256`: Amount to transfer

#### `PAY_PORTION`

- `address`: ERC20 token to transfer (or Constants.STEAMX for STEAMX)
- `address`: Recipient of the transfer
- `uint256`: Percentage of the contract's balance to transfer (in basis points)

#### `V2_SWAP_EXACT_IN`

- `address`: Recipient of the trade output
- `uint256`: Amount of input tokens for the trade
- `uint256`: Minimum desired output tokens
- `address[]`: Rails Network SwapV2 token path for the trade
- `bool`: Flag indicating whether input tokens should come from `msg.sender` (via Permit2) or are already in the `UniversalRouter`

#### `V2_SWAP_EXACT_OUT`

- `address`: Recipient of the trade output
- `uint256`: Amount of output tokens to receive
- `uint256`: Maximum input tokens to spend
- `address[]`: Rails Network SwapV2 token path for the trade
- `bool`: Flag indicating whether input tokens should come from `msg.sender` (via Permit2) or are already in the `UniversalRouter`

#### `PERMIT2_PERMIT`

- `IAllowanceTransfer.PermitSingle`: PermitSingle struct outlining the Permit2 permit to execute
- `bytes`: Signature for Permit2

The signer of the permit must be the `msg.sender` of the transaction.

#### `WRAP_ETH`

- `address`: Recipient of the WSTEAMX
- `uint256`: Amount of STEAMX to wrap

#### `UNWRAP_WETH`

- `address`: Recipient of the STEAMX
- `uint256`: Minimum required STEAMX to receive from the unwrapping

#### `PERMIT2_TRANSFER_FROM_BATCH`

- `IAllowanceTransfer.AllowanceTransferDetails[]`: Array of AllowanceTransferDetails structs, each describing a Permit2 transfer to perform

#### `SWEEP_ERC721`

- `address`: ERC721 token address to transfer
- `address`: Recipient of the transfer
- `uint256`: Token ID to transfer

#### `NFT20`

- `uint256`: STEAMX value to forward to the NFT20 contract
- `bytes`: Calldata to call the NFT20 contract

#### `FOUNDATION`

- `uint256`: STEAMX value to forward to the Foundation contract
- `bytes`: Calldata to call the Foundation contract
- `address`: Recipient of the ERC721
- `address`: ERC721 token address
- `uint256`: ID of the ERC721

#### `SWEEP_ERC1155`

- `address`: ERC1155 token address to sweep
- `address`: Recipient of the sweep
- `uint256`: Token ID to sweep
- `uint256`: Minimum tokens to receive from the sweep
