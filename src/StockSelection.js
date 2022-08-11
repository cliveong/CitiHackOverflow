import React, { useState } from 'react';
import PortfolioNav from "./PortfolioNav";
import "./StockSelection.css";
import Select from 'react-select';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';

const riskLevels = [
    { value: '1', label: '' },
    { value: '2', label: 'Low' },
    { value: '3', label: 'Med' },
    { value: '4', label: 'High' }
] 

export default function() {

    const DemoPie = () => {
        const data = [
          {
            type: 'Dimensional Global Core Equity Fund',
            value: 25,
          },
          {
            type: 'Amundi Prime USA Fund',
            value: 20,
          },
          {
            type: 'PIMCO GIS Global Bond Fund',
            value: 12,
          },
          {
            type: 'Amundi Index Global Agg 500m Fund',
            value: 8,
          },
          {
            type: 'Dimensional Emerging Markets Large Cap Core Equity Fund',
            value: 8,
          },
          {
            type: 'Dimensional Pacific Basin Small Companies Fund',
            value: 7,
          },
          {
            type: 'Dimensional Global Core Fixed Income Fund',
            value: 7,
          },
          {
            type: 'PIMCO GIS Income Fund (Acc)',
            value: 7,
          },
          {
            type: 'PIMCO GIS Emerging Markets Bond Fund',
            value: 6,
          },
        ];
        const config = {
          appendPadding: 10,
          data,
          angleField: 'value',
          colorField: 'type',
          radius: 1,
          innerRadius: 0.6,
          label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
              textAlign: 'center',
              fontSize: 14,
            },
          },
          interactions: [
            {
              type: 'element-selected',
            },
            {
              type: 'element-active',
            },
          ],
          statistic: {
            title: false,
            content: {
              style: {
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              content: 'Current\nPortfolio\nRisk: Med',
            },
          },
        };
        return <Pie {...config} />;
      };

    function dropDown() {
        return (
                <Select className='selectRisk' options={riskLevels} />
        )
    }

    function buttons() {
        return (
            <>
                <Button className="stockEditBtn">Edit</Button>
                <Button className="stockDeleteBtn">Delete</Button>
            </>
        )
    }


    return (
        <div>
            <PortfolioNav/>
            <div className='stockDonutContainer'>{DemoPie()}</div>
            <text>Recommendations</text>
            <table className='stockTable'>
                <thead className='stockthead'>
                    <tr className='stocktheadtr stocktr'>
                        <th>Index</th>
                        <th>Ticker</th>
                        <th>Risk Level</th>
                        <th>Date Added</th>
                        <th>Comments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody  className='stocktbody'>
                    <tr className='stocktbodytr stocktr'>
                        <td>1</td>
                        <td>GME</td>
                        <td>{dropDown()}</td>
                        <td>11/8/22s</td>
                        <td>Do not buy</td>
                        <td>{buttons()}</td>
                    </tr> 
                    <tr className='stocktbodytr stocktr'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr className='stocktbodytr stocktr'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr className='stocktbodytr stocktr'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr className='stocktbodytr stocktr'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> 
                    <tr className='stocktbodytr stocktr'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> 
                </tbody>
            </table>
        </div>
        
    );
}


