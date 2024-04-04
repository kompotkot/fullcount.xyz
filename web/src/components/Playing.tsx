import { Image } from "@chakra-ui/react";

import { useGameContext } from "../contexts/GameContext";
import SessionsView from "./sessions/SessionsView";
import PlayView from "./playing/PlayView";
import styles from "./Playing.module.css";
import { useQuery } from "react-query";
import { AtBat, OwnedToken } from "../types";
import { fetchFullcountPlayerTokens } from "../tokenInterfaces/FullcountPlayerAPI";
import queryCacheProps from "../hooks/hookCommon";
import useUser from "../contexts/UserContext";
import CreateCharacterForm from "./tokens/CreateCharacterForm";
import PlayingLayout from "./layout/PlayingLayout";
import ChooseToken from "./tokens/ChooseToken";
import HomePage from "./HomePage/HomePage";
import { getAtBats } from "../services/fullcounts";
import React, { useEffect, useState } from "react";
import { FULLCOUNT_ASSETS_PATH } from "../constants";
import { playSound } from "../utils/notifications";
import { getContracts } from "../utils/getWeb3Contracts";
import { getMulticallResults } from "../utils/multicall";

import { AbiItem } from "web3-utils";
import FullcountABIImported from "../web3/abi/FullcountABI.json";
const FullcountABI = FullcountABIImported as unknown as AbiItem[];

const Playing = () => {
  const {
    selectedSession,
    selectedToken,
    selectedTokenIdx,
    watchingToken,
    updateContext,
    invitedTo,
    isCreateCharacter,
    tokensCache,
    joinedNotification,
  } = useGameContext();
  const { user } = useUser();

  const ownedTokens = useQuery<OwnedToken[]>(
    ["owned_tokens", user],
    async () => {
      console.log("FETCHING TOKENS");
      const ownedTokens = user ? await fetchFullcountPlayerTokens() : [];
      // const waitingTokens = ownedTokens.map((t) => t.tokenProgress === 2);
      if (ownedTokens.length > 0 && !selectedToken && ownedTokens[selectedTokenIdx]) {
        updateContext({ selectedToken: { ...ownedTokens[selectedTokenIdx] } });
      }
      return ownedTokens;
    },
    {
      ...queryCacheProps,
      refetchInterval: 5000,
    },
  );

  const tokenStatuses = useQuery(
    ["token_statuses", ownedTokens.data, joinedNotification],
    async () => {
      if (!ownedTokens.data || ownedTokens.data.length < 1 || !joinedNotification) {
        return;
      }
      const { gameContract } = getContracts();
      const queries: { target: string; callData: string }[] = [];
      ownedTokens.data.forEach((ownedToken) => {
        queries.push({
          target: gameContract.options.address,
          callData: gameContract.methods
            .StakedSession(ownedToken.address, ownedToken.id)
            .encodeABI(),
        });
        let stakedSession;
        if (tokenStatuses.data) {
          stakedSession = tokenStatuses.data.find(
            (t) => t.address === ownedToken.address && t.id === ownedToken.id,
          )?.stakedSessionID;
        }
        queries.push({
          target: gameContract.options.address,
          callData: gameContract.methods.sessionProgress(stakedSession ?? 0).encodeABI(),
        });
      });

      const [stakedSessions, progresses] = await getMulticallResults(
        FullcountABI,
        ["StakedSession", "sessionProgress"],
        queries,
      );
      const result = ownedTokens.data.map((t, idx) => ({
        ...t,
        stakedSession: stakedSessions[idx],
        progress: progresses[idx],
      }));
      if (
        tokenStatuses.data &&
        tokenStatuses.data.some(
          (ts) =>
            ts.progress === "2" &&
            result.some((t) => t.address === ts.address && t.id === ts.id && t.progress === "3"),
        )
      ) {
        playSound("clapping");
      }

      return result;
    },
    {
      enabled: !!ownedTokens.data && joinedNotification,
      refetchIntervalInBackground: true,
      refetchInterval: 10000,
    },
  );

  const atBats = useQuery(
    ["atBats"],
    async () => {
      return getAtBats({ tokensCache });
    },
    {
      refetchInterval: 5000,
      onSuccess: (data: any) => {
        if (data.tokens.length !== tokensCache.length) {
          updateContext({ tokensCache: [...data.tokens] });
        }
      },
    },
  );

  if (!atBats.data || !ownedTokens.data) {
    return (
      <div className={styles.loadingViewContainer}>
        <Image
          alt={""}
          minW={"552px"}
          h={"123px"}
          position={"absolute"}
          src={`${FULLCOUNT_ASSETS_PATH}/stadium.png`}
          right={"50%"}
          bottom={"75%"}
          transform={"translateX(50%) translateY(50%)"}
          filter={"blur(0px)"}
        />
        <Image
          src={`${FULLCOUNT_ASSETS_PATH}/logo-4-no-stroke.png`}
          position={"absolute"}
          top={"10%"}
          right={"50%"}
          w={"158px"}
          transform={"translateX(50%) translateY(-40px)"}
          alt={""}
          h={"84px"}
          zIndex={"0"}
        />
        <Image
          src={`${FULLCOUNT_ASSETS_PATH}/batter.png`}
          position={"absolute"}
          bottom={"0"}
          right={"50%"}
          minW={"165px"}
          transform={"translateX(0) translateY(-40px)"}
          alt={""}
          h={"395px"}
          zIndex={"0"}
        />
        <Image
          src={`${FULLCOUNT_ASSETS_PATH}/pitcher.png`}
          position={"absolute"}
          bottom={"65%"}
          right={"50%"}
          transform={"translateX(50%) translateY(100%)"}
          alt={""}
          w={"60px"}
          h={"80px"}
          zIndex={"0"}
        />
      </div>
    );
  }

  return (
    <>
      {isCreateCharacter && (
        <CreateCharacterForm onClose={() => updateContext({ isCreateCharacter: false })} />
      )}

      {ownedTokens.data && ownedTokens.data.length < 1 && !ownedTokens.error && (
        <CreateCharacterForm />
      )}

      {!selectedSession &&
        ownedTokens.data &&
        ownedTokens.data.length >= 1 &&
        !invitedTo &&
        !isCreateCharacter && (
          <PlayingLayout>
            <HomePage tokens={ownedTokens.data} atBats={atBats.data?.atBats} />
          </PlayingLayout>
        )}

      {invitedTo && ownedTokens.data && !isCreateCharacter && (
        <ChooseToken
          tokens={ownedTokens.data}
          onChoose={(token) => {
            updateContext({ selectedToken: token, invitedTo: undefined });
          }}
          onClose={() => updateContext({ invitedTo: undefined })}
        />
      )}

      {selectedSession && watchingToken && <PlayView selectedToken={watchingToken} />}
      {selectedSession && !watchingToken && selectedToken && (
        <PlayView selectedToken={selectedToken} />
      )}
    </>
  );
};

export default Playing;
