/* @flow */
import { useState } from "react";
import axios from "axios";
import * as React from "react";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Col, Container, Row } from "reactstrap";
import {
  abbreviatedNumberFormatter,
  currencyFormatter,
  numberFormatter,
  percentFormatter,
} from "./formatters";
import { deviation, extent, max, min } from "d3-array";
import { scaleTime, scaleLinear } from "@vx/scale";
import { useDispatch, useSelector } from "react-redux";
import { AreaClosed } from "@vx/shape";
import {
  AdvancedChart,
  CompanyProfile,
  Timeline,
  TechnicalAnalysis,
} from "react-tradingview-embed";
import { Group } from "@vx/group";
import { LinearGradient } from "@vx/gradient";
import cx from "classnames";
import { fetchSymbolData } from "./actions";

type Props = {
  match: Object,
};

const wholeNumberFormatter = new window.Intl.NumberFormat(undefined);

function SummaryListItem({ title, value }: { title: string, value: string }) {
  return (
    <li className="d-flex justify-content-between border-bottom py-2">
      <span>{title}</span>
      <strong>{value}</strong>
    </li>
  );
}

const width = 635;
const height = 400;
const x = (d) => new Date(d.date);
const y = (d) => d.close;

// Bounds
const margin = {
  top: 20,
  bottom: 40,
  left: 50,
  right: 0,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

export default function Stock({ match }: Props): React.Node {
  const [allEvents, setAllEvents] = React.useState([]);
  const dispatch = useDispatch<Dispatch>();
  const chart = useSelector((state) => state.charts[match.params.symbol]);
  const quote = useSelector((state) => state.quotes[match.params.symbol]);

  React.useEffect(() => {
    dispatch(fetchSymbolData(match.params.symbol));
  }, [dispatch, match.params.symbol]);

  const [test, setTest] = useState("fetching...");
  async function handlePrediction(stock) {
    console.log("hahah", stock);
    await axios.post("http://localhost:5001/sentiment", { stock: stock }).then((response) => {
      console.log(response.data.sentiment);
      console.log("hahaha");
      setTest(response.data.sentiment);
    });
  }

  React.useEffect(() => {
    handlePrediction(match.params.symbol);
  }, []);

  var stock = "";
  let xScale;
  let yScale;
  if (chart != null) {
    const deviationYFudge = deviation(chart, y) / 2;
    xScale = scaleTime({
      range: [0, xMax],
      domain: extent(chart, x),
    });
    yScale = scaleLinear({
      range: [yMax, 0],
      domain: [min(chart, y) - deviationYFudge, max(chart, y) + deviationYFudge],
    });
  }
  return (
    <Container className="mb-3 mt-3">
      <h2>
        {quote == null ? "..." : quote.companyName} ({match.params.symbol})
      </h2>
      <h3>
        <small>{quote == null ? "..." : quote.latestPrice}</small>{" "}
        <span
          className={cx({
            "text-danger": quote != null && quote.change < 0,
            "text-success": quote != null && quote.change >= 0,
          })}
        >
          {quote == null
            ? "..."
            : `${quote.change >= 0 ? "+" : ""}${currencyFormatter.format(quote.change)} (${
                quote.changePercent >= 0 ? "+" : ""
              }${percentFormatter.format(quote.changePercent)})`}
        </span>
      </h3>
      <Row className="mt-4">
        <Col className="border-top border-top-lg pt-2" md="4">
          <h4 className="mb-3">Summary</h4>
          <ul className="list-unstyled">
            <SummaryListItem
              title="Predicted Risk Sentiment"
              value={quote == null ? "..." : String(test)}
            />
            <SummaryListItem
              title="Volume"
              value={quote == null ? "..." : wholeNumberFormatter.format(quote.latestVolume)}
            />
            <SummaryListItem
              title="Avg Daily Volume"
              value={quote == null ? "..." : wholeNumberFormatter.format(quote.avgTotalVolume)}
            />
            <SummaryListItem
              title="Previous Close"
              value={quote == null ? "..." : currencyFormatter.format(quote.previousClose)}
            />
            <SummaryListItem
              title="52-week Range"
              value={
                quote == null
                  ? "..."
                  : `${currencyFormatter.format(quote.week52Low)}–${currencyFormatter.format(
                      quote.week52High
                    )}`
              }
            />
            <SummaryListItem
              title="Mkt. Cap"
              value={quote == null ? "..." : abbreviatedNumberFormatter.format(quote.marketCap)}
            />
            <SummaryListItem
              title="P/E Ratio"
              value={
                quote == null || quote.peRatio == null
                  ? "..."
                  : numberFormatter.format(quote.peRatio)
              }
            />
          </ul>
          <TechnicalAnalysis
            widgetPropsAny={{
              symbol: match.params.symbol,
              colorTheme: "light",
              isTransparent: false,
              locale: "en",
              width: "370",
              height: "400",
            }}
          />
        </Col>
        <Col className="border-top border-top-lg pt-2" md={{ offset: 1, size: 7 }}>
          <h4 className="mb-3">History</h4>
          <Col span={24} xl={{ span: 12 }}>
            <CompanyProfile
              widgetPropsAny={{
                symbol: match.params.symbol,
                colorTheme: "light",
                isTransparent: false,
                locale: "en",
                width: "100%",
                popup_height: "650",
                popup_width: "1000",
                height: "300",
              }}
            />
            <AdvancedChart
              widgetPropsAny={{
                symbol: match.params.symbol,
                width: "100%",
                interval: "D",
                timezone: "Asia/Singapore",
                theme: "light",
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                withdateranges: true,
                allow_symbol_change: true,
                show_popup_button: true,
                popup_width: "1000",
                popup_height: "650",
                hide_side_toolbar: true,
                height: "400",
              }}
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
