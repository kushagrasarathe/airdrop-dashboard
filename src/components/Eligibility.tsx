"use client";

import React, { useState } from "react";

interface Metric {
  name: string;
  metrics: string[];
}

const eligibilityMetrics: Metric[] = [
  {
    name: "Bridged To Arbitrum",
    metrics: [
      `You’ve bridged funds into Arbitrum One`,
      `You’ve bridged funds into Arbitrum Nova`,
    ],
  },
  {
    name: "Transactions Over Time",
    metrics: [
      `You’ve conducted transactions during 2 distinct months`,
      `You’ve conducted transactions during 6 distinct months`,
      `You’ve conducted transactions during 9 distinct months`,
    ],
  },
  {
    name: "Transaction Frequency and Interaction",
    metrics: [
      `You’ve conducted more than 4 transactions OR interacted with more than 4 smart contracts`,
      `You’ve conducted more than 10 transactions OR interacted with more than 10 smart contracts`,
      `You’ve conducted more than 25 transactions OR interacted with more than 25 smart contracts`,
      `You’ve conducted more than 100 transactions OR interacted with more than 100 smart contracts`,
    ],
  },
  {
    name: "Transaction Value",
    metrics: [
      `You’ve conducted transactions with more than $10,000 in aggregate value`,
      `You’ve conducted transactions with more than $50,000 in aggregate value`,
      `You’ve conducted transactions with more than $50,000 in aggregate value`,
    ],
  },
  {
    name: "Assets Bridged to Arbitrum One",
    metrics: [
      `You’ve deposited more than $10,000 of assets`,
      `You’ve deposited more than $50,000 of assets`,
      `You’ve deposited more than $250,000 of assets`,
    ],
  },
  {
    name: "Activity on Arbitrum Nova",
    metrics: [
      `You’ve conducted more than 3 transactions`,
      `You’ve conducted more than 5 transactions`,
      `You’ve conducted more than 10 transactions`,
    ],
  },
];

export default function Eligibility() {
  return (
    <div className=" flex eligibility_container h-full">
      <div className=" w-1/2 flex flex-col items-center justify-between h-full">
        <div className=" mb-auto">
          <h2> Ah shoot</h2>
          <p>
            Looks like this wallet isn&apos;t eligible. No stress, you can still
            participate in the ecosystem and governance in several ways.
          </p>
        </div>
        <div className=" ">
          <button className=" bg-blue-500 text-white px-4 py-2 rounded-md tracking-wide">
            Check Eligibility
          </button>
        </div>
      </div>
      <div className="w-1/2">
        {/* <h2>Eligibility Metrics</h2> */}
        {eligibilityMetrics.map((metric) => (
          <div key={metric.name}>
            <Container name={metric.name} metrics={metric.metrics} />
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

const Container = ({ name, metrics }: Metric) => {
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
        <div className=" col-span-11 uppercase text-white">{name}</div>
        <button className=" col-span-1 ml-auto text-lg">
          {show ? "-" : "+"}
        </button>
      </div>
      <div className=" col-span-full list-none  ">
        {show &&
          metrics.map((item, itemIndex) => (
            <div className=" my-2 text-textPrimary" key={itemIndex}>
              {/* {getResultStateForItem(item) ? (
                <FaCheck className="text-green-500 ml-2" />
              ) : (
                <FaTimes className="text-red-500 ml-2" />
              )} */}
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};
