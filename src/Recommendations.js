import React, { useState, useContext } from "react";
import PortfolioNav from "./PortfolioNav";
import { Context } from "./Context";
import "./StockSelection.css";

export default function () {
  const [user, setUser, data, setData] = useContext(Context);
  return (
    <div>
      <PortfolioNav />
      <div style={{ paddingTop: "100px" }}>
        <text>Recommendations: </text>
        <table className="stockTable">
          <thead className="stockthead">
            <tr className="stocktheadtr stocktr">
              <th>Index</th>
              <th>Ticker</th>
              <th>Risk Level</th>
              <th>Date Added</th>
              <th>Comments</th>
              <th></th>
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
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
