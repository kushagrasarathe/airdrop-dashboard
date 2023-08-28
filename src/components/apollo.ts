import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const STATS_APIURL =
  "https://api.thegraph.com/subgraphs/name/danielsmith0630/fxdx-optimism-stats";

const ACTIONS_APIURL =
  "https://api.thegraph.com/subgraphs/name/danielsmith0630/fxdx-optimism-actions";

const statsQuery = `
  query($id: Bytes) {
      userData(id: $id) {
        actionMarginCount
        actionMintBurnCount
        actionSwapCount
        id
        period
      }
  }
`;

const userTradesStats = `
query($id: Bytes) 
  {
    userTradesStat(id: $id) {
      account
      burnVolume
      id
      lastActiveAt
      liquidationVolume
      marginVolume
      mintVolume
      netPnl
      swapVolume
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

export const getUserStats = async (address: any) => {
  return await statsClient
    .query({
      query: gql(statsQuery),
      variables: { id: address },
    })
    .then((data) => {
      // console.log("getUserStats data: ", data.data.userData);
      return data.data.userData;
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
};

export const getUserTradeStats = async (address: any) => {
  return await tradeStatsClient
    .query({
      query: gql(userTradesStats),
      variables: { id: `total:0:${address}` },
    })
    .then((data) => {
      // console.log("Subgraph data: ", data.data.userTradesStat);
      return data.data.userTradesStat;
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
};
