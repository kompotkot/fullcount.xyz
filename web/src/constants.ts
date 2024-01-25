export const GAME_CONTRACT = "0x9270df8d907A99E5024dc3532657a5cF9C7A4889";
export const TOKEN_CONTRACT = "0x0642aE350D9BF3ceb3695bF0895aD8B60872B227";
export const CHAIN_ID = 322;
export const GAME_CONTRACT_VERSION = "0.1.0";
export const SECOND_REVEAL_PRICE_MULTIPLIER = 3;
export const SESSIONS_OFFSET = 20;
export const AT_BATS_OFFSET = 20;

export const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/1ZsWoXlYgL6XkAdA2BLyM6phJOfyg7Jo1EZiMMBeir4M";

const MULTICALL2_POLYGON_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_MULTICALL2_POLYGON_CONTRACT_ADDRESS;
const MULTICALL2_MUMBAI_CONTRACT_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
const MULTICALL2_WYRM_CONTRACT_ADDRESS = "0x23a327296EB6c4ac98318A702A7Fe1082b922c0b";

export const MULTICALL2_CONTRACT_ADDRESSES = {
  "137": MULTICALL2_POLYGON_CONTRACT_ADDRESS,
  "80001": MULTICALL2_MUMBAI_CONTRACT_ADDRESS,
  "322": MULTICALL2_WYRM_CONTRACT_ADDRESS,
};

export const MAX_INT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const AWS_STATIC_ASSETS_PATH = "https://static.simiotics.com/moonstream/assets";

export const FULLCOUNT_ASSETS_PATH = "https://static.simiotics.com/fullcount";
export const TOKEN_IMAGE_FALLBACK = `${FULLCOUNT_ASSETS_PATH}/question.png`;

export const DISCORD_LINK = "https://discord.gg/K56VNUQGvA";

export type ChainName = "ethereum" | "localhost" | "mumbai" | "polygon" | "wyrm" | "gnosis";
export type ChainId = 1 | 1337 | 80001 | 137 | 322 | 100;

// map chain names to image paths
const chainNameToImagePath: Record<string, string> = {
  ethereum: `${AWS_STATIC_ASSETS_PATH}/icons/eth-outline.png`,
  localhost: `${AWS_STATIC_ASSETS_PATH}/icons/localhost-outline.png`,
  mumbai: `${AWS_STATIC_ASSETS_PATH}/icons/polygon-outline.png`,
  polygon: `${AWS_STATIC_ASSETS_PATH}/icons/polygon-outline.png`,
  wyrm: `${AWS_STATIC_ASSETS_PATH}/icons/wyrm-small-fill.png`,
  gnosis: `${AWS_STATIC_ASSETS_PATH}/icons/gnosis.png`,
  xdai: `${AWS_STATIC_ASSETS_PATH}/icons/gnosis.png`,
};

// map chain IDs to image paths
const chainIdToImagePath: Record<ChainId, string> = {
  1: `${AWS_STATIC_ASSETS_PATH}/icons/eth-outline.png`,
  1337: `${AWS_STATIC_ASSETS_PATH}/icons/localhost-outline.png`,
  80001: `${AWS_STATIC_ASSETS_PATH}/icons/polygon-outline.png`,
  137: `${AWS_STATIC_ASSETS_PATH}/icons/polygon-outline.png`,
  322: `${AWS_STATIC_ASSETS_PATH}/icons/wyrm-small-fill.png`,
  100: `${AWS_STATIC_ASSETS_PATH}/icons/gnosis.png`,
};

export const getChainImage = (identifier: string | number): string | undefined => {
  if (identifier in chainNameToImagePath) {
    return chainNameToImagePath[identifier as ChainName];
  } else if (identifier in chainIdToImagePath) {
    return chainIdToImagePath[identifier as ChainId];
  }
};
