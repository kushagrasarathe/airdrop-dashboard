import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const STATS_APIURL =
  "https://api.thegraph.com/subgraphs/name/danielsmith0630/fxdx-optimism-stats";

const ACTIONS_APIURL =
  "https://api.thegraph.com/subgraphs/name/danielsmith0630/fxdx-optimism-actions";

const statsQuery = `
  query($id: Bytes) {
    userStat(id: $id) {
      id
      actionCount ## total transactions, condition 1
      actionMarginCount 
      actionMintBurnCount
      uniqueCount
      actionSwapCount
      uniqueMarginCount
      uniqueMintBurnCount
      uniqueSwapCount
    }
    volumeStat(id: $id) {
      liquidation
      margin
      mint
      swap
      burn
    }
  }
`;

const userTradesStats = `
query($id: Bytes) {
    userTradesStat(id: $id) {
      account
      burnVolume
      marginVolume
      mintVolume
      swapVolume
      liquidationVolume
    }
  }
`;

const statsClient = new ApolloClient({
  uri: STATS_APIURL,
  cache: new InMemoryCache(),
});

const tradeStatsClient = new ApolloClient({
  uri: ACTIONS_APIURL,
  cache: new InMemoryCache(),
});

export const getUserStats = async (userId: any) => {
  statsClient
    .query({
      query: gql(statsQuery),
      variables: { id: userId },
    })
    .then((data) => {
      console.log("Subgraph data: ", data);
      return data;
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
};

export const getUserTradeStats = async (userId: any) => {
  tradeStatsClient
    .query({
      query: gql(userTradesStats),
      variables: { id: userId },
    })
    .then((data) => {
      console.log("Subgraph data: ", data);
      return data;
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
};
