export const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const ChainsConfig = {
	SHARDEUM_BETA: {
		chainId: 8082,
		chainName: "Shardeum Liberty 2.0",
		nativeCurrency: { name: "Shardeum", symbol: "SHM", decimals: 18 },
		rpcUrls: ["https://sphinx.shardeum.org"],
		blockExplorerUrls: ["https://explorer-sphinx.shardeum.org/"],
		nftContract: "0x5F362d4Ed224aE949Eac7015fA3E8091B89b95e8",
		nft1155Contract: "0xFD1dA889CeF3a6194FEa6587F836e10a8F0ba7D0",
		marketContract: "0xe3D06f136529B2e969CB99a47244B17c7081f90a",
		auctionContract: "0xcFC27BC05c79eB9e05D1DB6314a2071c720b926C",
	},
	SHARDEUM_LIBERTY_2: {
		chainId: 8081,
		chainName: "Shardeum Liberty 2.0",
		nativeCurrency: { name: "Shardeum", symbol: "SHM", decimals: 18 },
		rpcUrls: ["https://liberty20.shardeum.org/"],
		blockExplorerUrls: ["https://explorer-liberty20.shardeum.org/"],
		nftContract: "0x0Fb01DAc8e2F996651Fb76C39F44fee5c13e587e",
		nft1155Contract: "0xFD1dA889CeF3a6194FEa6587F836e10a8F0ba7D0",
		marketContract: "0x1E91870ACacd01424A207b99B3f7f54DC7F5EFB5",
		auctionContract: "0x3B29b69F87aC0c349aaD04303fC6Ac607312467e",
	},
};