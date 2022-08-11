import React, { useState, useContext } from "react";
import PortfolioNav from "./PortfolioNav";
import { Context } from "./Context";
import "./StockSelection.css";
import ReactDOM from "react-dom";
import { Pie, measureTextWidth } from "@ant-design/plots";

export default function () {
  const DemoPie = () => {
    const data = [
      {
        type: "Dimensional Global Core Equity Fund",
        value: 25,
      },
      {
        type: "Amundi Prime USA Fund",
        value: 20,
      },
      {
        type: "PIMCO GIS Global Bond Fund",
        value: 12,
      },
      {
        type: "Amundi Index Global Agg 500m Fund",
        value: 8,
      },
      {
        type: "Dimensional Emerging Markets Large Cap Core Equity Fund",
        value: 8,
      },
      {
        type: "Dimensional Pacific Basin Small Companies Fund",
        value: 7,
      },
      {
        type: "Dimensional Global Core Fixed Income Fund",
        value: 7,
      },
      {
        type: "PIMCO GIS Income Fund (Acc)",
        value: 7,
      },
      {
        type: "PIMCO GIS Emerging Markets Bond Fund",
        value: 6,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: "inner",
        offset: "-50%",
        content: "{value}",
        style: {
          textAlign: "center",
          fontSize: 14,
        },
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          content: "Current\nPortfolio\nRisk: Med",
        },
      },
    };
    return <Pie {...config} />;
  };
  const [user, setUser, data, setData] = useContext(Context);
  return (
    <div>
      <PortfolioNav />
      <div className="stockDonutContainer">{DemoPie()}</div>
      <div style={{ paddingTop: "100px" }}>
        <text>Recommendations</text>
        <table className="stockTable">
          <thead className="stockthead">
            <tr className="stocktheadtr stocktr">
              <th>Index</th>
              <th>Ticker</th>
              <th>Risk Level</th>
              <th>Date Added</th>
              <th>Comments</th>
              <th>Beta</th>
            </tr>
          </thead>
          {data.map((stock) => (
            <tbody className="stocktbody">
              <tr className="stocktbodytr stocktr">
                <td>{stock.index}</td>
                <td>{stock.ticker}</td>
                <td>{stock.risk}</td>
                <td>{stock.date}</td>
                <td>{stock.comment}</td>
                <td>{stock.beta}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
