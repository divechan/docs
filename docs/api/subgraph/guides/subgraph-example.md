---
id: examples
title: Query Examples
sidebar_position: 3
---

# Subgraph Query Examples

This document provides guidance on querying Rails Network analytics using GraphQL queries on the subgraph. You can retrieve various data points such as:

- [Current liquidity](#pool-data) of a pool
- [Volume on a certain day](#historical-global-data)

and much more. Below are some example queries. To run a query, copy and paste it into the [v3 explorer](https://graph.steamexchange.io) to obtain fresh data.

## Global Data

Global data encompasses data points about the Rails Network Swap protocol as a whole. Examples of global data points include total value locked in the protocol, total deployed pools, or total transaction counts. To query global data, you must provide the Rails Network Factory address `0xAdD2FC2189dA02E4122E6D734094bF1474516AD0` and select the desired fields. Refer to the full [factory schema](https://graph.steamexchange.io) for all possible fields.

### Current Global Data

An example query for total pool count, transaction count, and total volume in USD and STEAMX:

```graphql
{
  uniswapFactory(id: "0xAdD2FC2189dA02E4122E6D734094bF1474516AD0") {
    pairCount
    totalVolumeUSD
    totalLiquidityUSD
    txCount
  }
}
```

### Historical Global Data

You can query historical data by specifying a block number:

```graphql
{
  uniswapFactory(id: "0xAdD2FC2189dA02E4122E6D734094bF1474516AD0", block: {number: 100500}) {
    pairCount
    txCount
    totalVolumeUSD
    totalVolumeETH
  }
}
```

## Pool Data

To obtain data about a specific pool, provide the pool address. Refer to the full [pool schema](https://graph.steamexchange.io) and adjust the query fields to retrieve the desired data points.

### General Pool Query

The following query returns the fee tier, spot price, and liquidity for the STEAMX-USDC pool:

```graphql
{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    tick
    token0 {
      symbol
      id
      decimals
    }
    token1 {
      symbol
      id
      decimals
    }
    feeTier
    sqrtPrice
    liquidity
  }
}
```

### All Possible Pools

The maximum items you can query at once is 1000. To retrieve all possible pools, you can iterate using the skip variable. To skip pools, increase the number after `skip:`:

```graphql
{
  pairs(first:10, skip:0) {
    id
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
  }
}
```

### Most Liquid Pools

Retrieve the top 1000 most liquid pools:

```graphql
{
  pairs(first: 1000, orderBy: token0__totalLiquidity, orderDirection: desc) {
    id
    token0 {
      id
      name
    }
    token1 {
      id
      name
    }
  }
}
```

### Pool Daily Aggregated

This query returns daily aggregated data for the first 10 days since the given timestamp for the STEAMX-USDC pool:

```graphql
{
  pairDayDatas(first: 10, orderBy: date, where: {
    pairAddress: "0x587d7f5db5feee563d55fab612400f147cf107f0",
    date_gt: 1633642435
  } ) {
    date
    token0 {
      id
    }
    token1 {
      id
    }
    dailyVolumeToken0
    dailyVolumeToken1
  }
}
```

## Swap Data

### General Swap Data

To query data about a particular swap, input the transaction hash + "#" + the index in the swaps the transaction array. Refer to the full [swap schema](https://graph.steamexchange.io).

This query fetches data about the sender, receiver, amounts, transaction data, and timestamp for a particular swap:

```graphql
{
  swaps(where: { transaction: "0xd4567fc3c9b4f5b01e7404347226551162ebd3d7d01c09246e5f2e383b305030" }) {
    id
    sender
    to
    amount0Out
    amount1Out
    timestamp
    transaction {
      id
      blockNumber
    }
  }
}
```

### Recent Swaps Within a Pool

Filter swap data by pool address. This example fetches data about multiple swaps for the USDC-USDT pool, ordered by timestamp:

```graphql
{
  swaps(orderBy: timestamp, orderDirection: desc, where: { pair: "0x587d7f5db5feee563d55fab612400f147cf107f0" }) {
    pair {
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
    sender
    to
    amount0Out
    amount1Out
  }
}
```

## Token Data

Input the token contract address to fetch token data. Any token that exists in at least one Rails Network Swap pool can be queried. The output will aggregate data across all v3 pools that include the token.

### General Token Data

This queries the decimals, symbol, name, pool count, and volume in USD for the UNI token:

```graphql
{
  token(id:"0x0000000000000000000000000000000000627800") {
    symbol
    name
    decimals
    tradeVolumeUSD
  }
}
```

### Token Daily Aggregated

Fetch aggregate data about a specific token over a 24-hour period:

```graphql
{
  tokenDayDatas(first: 10, where: {token: "0x0000000000000000000000000000000000627800"}, orderBy: date, orderDirection: asc) {
    date
    token {
      id
      symbol
    }
    dailyVolumeUSD
  }
}
```

## Note:

There are many more queries you can perform with the Rails Network Swap subgraph, including data related to ticks, mints, positions, and burns.