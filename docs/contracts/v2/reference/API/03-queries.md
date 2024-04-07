---
id: queries
title: Queries
---

This section provides insights into querying the Rails Network Swap Subgraph for comprehensive data on the network, including its pairs, tokens, transactions, and user activities. Examples of typical queries are showcased below.

Experience these queries firsthand and explore custom ones in the [subgraph sandbox](https://graph.steamexchange.io).

### Global Data

For global insights, input the Rails Network Swap Factory address and choose the relevant fields to query.

#### Global Statistics

Query for the factory's cumulative volume in USD, overall liquidity in USD, and the total count of transactions.

```
{
  uniswapFactory(id: "0xAdD2FC2189dA02E4122E6D734094bF1474516AD0"){
    totalVolumeUSD
    totalLiquidityUSD
    txCount
  }
}
```

#### Historical Global Data

To access historical data, utilize The Graph's block query capability, targeting a specific block number. For information on deriving block numbers from timestamps, refer to this [guide](https://blocklytics.org/blog/ethereum-blocks-subgraph-made-for-time-travel/), useful for computing metrics like 24-hour volume.

```
{
  uniswapFactory(id: "0xAdD2FC2189dA02E4122E6D734094bF1474516AD0", block: {number: 100200}){
    totalVolumeUSD
    totalLiquidityUSD
    txCount
  }
}
```

### Pair Data

#### Overview of a Pair

To get current details of a specific pair, such as DAI/WETH, including tokens, reserves, and volume data.

```
{
  pair(id: "0x587d7f5db5feee563d55fab612400f147cf107f0"){
    token0 {
      id
      symbol
      name
      derivedETH
    }
    token1 {
      id
      symbol
      name
      derivedETH
    }
    reserve0
    reserve1
    reserveUSD
    trackedReserveETH
    token0Price
    token1Price
    volumeUSD
    txCount
  }
}
```

#### Liquidity Ranking

To find the most liquid pairs in Rails Network Swap, sort them by their USD reserves.

```
{
  pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc) {
    id
  }
}
```

#### Recent Swap Activities

To view the latest swaps for a pair, query Swap events with the pair's address, including detailed token and amount data.

```
{
  swaps(orderBy: timestamp, orderDirection: desc, where: { pair: "0x587d7f5db5feee563d55fab612400f147cf107f0" }) {
    pair {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    amount0In
    amount0Out
    amount1In
    amount1Out
    amountUSD
    to
  }
}
```

#### Daily Aggregated Pair Data

For historical analysis, query daily aggregated data of a pair to study trends and changes over time.

```
{
  pairDayDatas(first: 100, orderBy: date, orderDirection: asc, where: {
    pairAddress: "0x587d7f5db5feee563d55fab612400f147cf107f0",
    date_gt: 1592505859
  }) {
    date
    dailyVolumeToken0
    dailyVolumeToken1
    dailyVolumeUSD
    reserveUSD
  }
}
```

### Token Data

#### Token Snapshot

To view the current metrics of a specific token within Rails Network Swap, query its contract address.

```
{
  token(id: "0x0000000000000000000000000000000000627800") {
    name
    symbol
    decimals
    derivedETH
    tradeVolumeUSD
    totalLiquidity
  }
}
```

#### Daily Token Metrics

To obtain daily data for a token, utilize the `tokenDayDatas` query, allowing for a chronological view of token activity.

``

`
{
  tokenDayDatas(orderBy: date, orderDirection: asc, where: {
    token: "0x0000000000000000000000000000000000627800"
  }) {
    id
    date
    priceUSD
    totalLiquidityToken
    totalLiquidityUSD
    totalLiquidityETH
    dailyVolumeETH
    dailyVolumeToken
    dailyVolumeUSD
  }
}
```

### STEAMX Price Tracking

Query the Bundle entity to ascertain the current USD value of STEAMX in Rails Network Swap, based on stablecoin pair averages.

```
{
  bundle(id: "1") {
    ethPrice
  }
}
```