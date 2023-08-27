"use client";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useAccount } from "wagmi";

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
    [false],
    [false, true],
    [false, false],
  ]);

  const { address, isConnecting, isDisconnected } = useAccount();

  const checkEligibility = () => {
    alert(address);
  };

  return (
    <div className=" flexBox eligibility_container h-full">
      <div className=" w-1/2 flexBox flex-col items-center justify-between h-full">
        <div className=" mb-auto">
          <h2> Ah shoot</h2>
          <p>
            Looks like this wallet isn&apos;t eligible. No stress, you can still
            participate in the ecosystem and governance in several ways.
          </p>
        </div>
        <div className=" ">
          <button
            onClick={checkEligibility}
            className=" bg-blue-500 text-white px-4 py-2 rounded-md tracking-wide"
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
            <div className=" my-2 text-textPrimary flex items-start gap-x-3 " key={itemIndex}>
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
