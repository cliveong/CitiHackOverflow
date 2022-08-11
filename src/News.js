/* @flow */

import React, { useState, useContext } from "react";
import PortfolioNav from "./PortfolioNav";
import { Context } from "./Context";
import "./StockSelection.css";
import { AdvancedChart, CompanyProfile, Timeline, StockMarket } from "react-tradingview-embed";
import { Button, Col, Row } from "reactstrap";

export default function () {
  return (
    <div>
      <PortfolioNav />
      <Row>
        <Col>
          <StockMarket
            widgetPropsAny={{
              feedMode: "all_symbols",
              colorTheme: "light",
              isTransparent: true,
              displayMode: "adaptive",
              width: "100%",
              height: "600",
              locale: "en",
            }}
          />
        </Col>
      </Row>
      <Timeline
        widgetPropsAny={{
          feedMode: "all_symbols",
          colorTheme: "light",
          isTransparent: false,
          displayMode: "adaptive",
          width: "100%",
          height: "500",
          locale: "en",
        }}
      />
    </div>
  );
}
