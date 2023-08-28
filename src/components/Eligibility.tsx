"use client";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useAccount } from "wagmi";
import { getUserStats, getUserTradeStats } from "./apollo";
import { formatEther, formatUnits } from "viem";

interface ContainerInputs {
  name: string;
  metrics: string[];
  metricsStatus: boolean[];
}

interface Metric {
  name: string;
  metrics: string[];
}

const eligibilityMetrics: Metric[] = [
  {
    name: " Number of transactions done on the protocol.",
    metrics: [`You’ve conducted minimum 10 transactions `],
  },
  {
    name: " Number of times traded and volume traded",
    metrics: [
      `You’ve done minimum 10 trades`,
      `You’ve done trades of more than $10K volume`,
    ],
  },
  {
    name: "Number of times added Liquidity and volume of Liquidity provided",
    metrics: [
      `You’ve added liquidity minimum 10 times`,
      `You’ve added liquidity of more than $10K volume`,
    ],
  },
];

export default function Eligibility() {
  const [metricStatus, setMetricStatus] = useState<boolean[][]>([
    // [true],
    // [true, true],
    // [true, true],
    [false],
    [false, false],
    [false, false],
  ]);

  const [totalNoTransactions, setTotalTransactions] = useState<number | null>(
    null
  );
  const [isEligible, setIsEligible] = useState<boolean>(false);

  const { address, isConnecting, isDisconnected } = useAccount();

  // useEffect(() => {
  //   if (!isConnecting && !isDisconnected) {
  //     userStats();
  //   }
  // }, [isConnecting, isDisconnected]);

  const checkEligibility = () => {
    userStats();
    const eligibleForAirdrop = metricStatus.every((row) =>
      row.every((value) => value === true)
    );
    setIsEligible(eligibleForAirdrop);
  };

  const userStats = async () => {
    const data = await getUserTradeStats(
      // address
      // "0x26e76b18d4a132a9397c46af11e4688bdb602e92"
      // "0x85548b1405cc1938f430bdef69a3e92fae17c11a"
      "0x13201714657f8b211f72c5050aeb146d1fafc890"
    );
    const actions = await getUserStats(
      // address
      // "0x26e76b18d4a132a9397c46af11e4688bdb602e92"
      // "0x85548b1405cc1938f430bdef69a3e92fae17c11a"
      "0x13201714657f8b211f72c5050aeb146d1fafc890"
      // "0x26e76b18d4a132a9397c46af11e4688bdb602e92"
    );

    if (data === null || actions === null) {
      const newMetricStatus = metricStatus.map((row) => row.map(() => false));
      setMetricStatus(newMetricStatus);
    }
    if (data !== null || actions !== null) {
      const totalTransactions =
        actions.actionMarginCount +
        actions.actionMintBurnCount +
        actions.actionSwapCount;
      totalTransactions;

      if (totalTransactions >= 10) {
        // const currentMetric = metricStatus;
        const currentMetric = [...metricStatus];
        currentMetric[0][0] = true;
        setMetricStatus(currentMetric);
      } else if (totalTransactions < 10) {
        // setTotalTransactions(totalTransactions);
        alert(
          `You've done only ${totalTransactions} transactions on the patform, you are not eligible for airdrop.`
        );
      }

      const totalTrades = actions.actionSwapCount;

      if (totalTrades >= 10) {
        // const currentMetric = metricStatus;
        const currentMetric = [...metricStatus];
        currentMetric[1][0] = true;
        setMetricStatus(currentMetric);
      }

      const tradeVolume = formatUnits(data.swapVolume, 30);
      // console.log(tradeVolume);
      if (Number(tradeVolume) >= 10000) {
        // const currentMetric = metricStatus;

        const currentMetric = [...metricStatus];
        currentMetric[1][1] = true;
        setMetricStatus(currentMetric);
      }

      // console.log(data)
      const liqVolume = formatUnits(data.liquidationVolume, 30);
      // console.log(tradeVolume);
      if (Number(liqVolume) >= 10000) {
        // const currentMetric = metricStatus;
        const currentMetric = [...metricStatus];

        currentMetric[2][1] = true;
        setMetricStatus(currentMetric);
      }
    }

    console.log(data);
    console.log(actions);
    // console.log(metricStatus)
  };

  return (
    <div className=" flexBox eligibility_container h-full">
      <div className=" w-1/2 flexBox flex-col items-center justify-between h-full">
        <div className=" mb-auto">
          {isEligible ? (
            <>
              <h2 className=" text-2xl font-semibold tracking-wide">
                Congrats!!!
              </h2>
              <p>You are eligble for airdrop</p>
            </>
          ) : (
            <>
              <h2 className=" text-2xl font-semibold tracking-wide">
                {" "}
                Ah shoot
              </h2>
              <p>
                Looks like this wallet isn&apos;t eligible. No stress, you can
                still participate in the ecosystem and governance in several
                ways.
              </p>
              {totalNoTransactions && (
                <div className=" text-red-500 text-lg font-semibold tracking-wide">
                  You have made {totalNoTransactions} transactions on the
                  platform.
                </div>
              )}
            </>
          )}
        </div>
        <div className=" ">
          <button
            onClick={checkEligibility}
            className=" bg-blue-500 active:scale-95 transition-all ease-in-out text-white px-4 py-2 rounded-md tracking-wide"
          >
            Check Eligibility
          </button>
        </div>
      </div>
      <div className="w-1/2">
        {eligibilityMetrics.map((metric, idx) => (
          <div key={metric.name}>
            <Container
              name={metric.name}
              metrics={metric.metrics}
              metricsStatus={metricStatus[idx]}
            />
          </div>
        ))}
        <div className="border-t border-gray-700 pt-6">
          Points scored (minimum of three) before Arbitrum Nitro launched are
          worth double. Sybil detection criteria was also used and affected
          eligibility. Learn More.
        </div>
      </div>
    </div>
  );
}

const Container = ({ name, metrics, metricsStatus }: ContainerInputs) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow((prev: boolean) => !prev);
  };

  return (
    <div
      onClick={toggleShow}
      className=" cursor-pointer py-6 gap-y-4 border-t border-gray-700 min-h-[100px]  mx-auto grid grid-cols-12 items-start justify-between"
    >
      <div className=" col-span-full grid grid-cols-12 gap-3">
        <div className=" col-span-11 uppercase text-white">
          <div>{name}</div>
        </div>
        <button className=" col-span-1 ml-auto text-lg">
          {show ? "-" : "+"}
        </button>
      </div>
      <div className=" col-span-full list-none  ">
        {show &&
          metrics.map((item, itemIndex) => (
            <div
              className=" my-2 text-textPrimary flex items-start gap-x-3 "
              key={itemIndex}
            >
              <div>
                {metricsStatus[itemIndex] ? (
                  <BiCheck color="green" size="1.5em" />
                ) : (
                  <RxCross2 color="red" size="1.3em" />
                )}
              </div>
              <div>{item}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
