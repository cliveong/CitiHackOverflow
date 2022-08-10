import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from 'reactstrap';
import "./RiskAssessment.css";
import PortfolioNav from "./PortfolioNav";


const options1 = [
    { value: '1', label: 'Within 6 months' },
    { value: '2', label: 'Within the next 3 years' },
    { value: '3', label: 'Between 3 and 6 years' },
    { value: '4', label: 'No sooner than 7 years' }
]

const options2 = [
    { value: '1', label: 'More than 75%.' },
    { value: '2', label: '50% or more but less than 75' },
    { value: '3', label: ' 25% or more but less than 50%' },
    { value: '4', label: 'Less than 25%' }
]  

const options3 = [
    { value: '1', label: 'Decrease' },
    { value: '2', label: 'Remain the same or grow slowly' },
    { value: '3', label: 'Grow faster than the rate of inflation' },
    { value: '4', label: 'Grow quickly' }
]  

const options4 = [
    { value: '1', label: 'No' },
    { value: '2', label: 'Yes, but less than I like to have' },
    { value: '3', label: 'Yes' },
    { value: '4', label: 'Yes, with plenty to spare' }
]  

const options6 = [
    { value: '1', label: '0%' },
    { value: '2', label: '10%' },
    { value: '3', label: '25%' },
    { value: '4', label: '50%' }
]  

const options5 = [
    { value: '1', label: 'No' },
    { value: '2', label: 'No, but I would like to' },
    { value: '3', label: 'Yes,but I was uneasy about it' },
    { value: '4', label: 'Yes' }
]  

const options7 = [
    { value: '1', label: 'Perserve my original investment' },
    { value: '2', label: 'Receive some growth and provide income' },
    { value: '3', label: 'Grow faster than inflation and still provide some income' },
    { value: '4', label: 'Grow as much as possible, income is not a requirement today' }
]  


export default function Riskassessment() {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [risk, setRisk] = useState("");
    const [count1, setCount1] = useState('0');
    const [count2, setCount2] = useState('0');
    const [count3, setCount3] = useState('0');
    const [count4, setCount4] = useState('0');
    const [count5, setCount5] = useState('0');
    const [count6, setCount6] = useState('0');
    const [count7, setCount7] = useState('0');
    
    function calcResults() {
        let totalSum = Number(count1) +  Number(count2) + Number(count3)
         + Number(count4) +  Number(count5) + Number(count6) + Number(count7);

         console.log(count2);
         console.log(totalSum);
        if (totalSum < 7) {
            setRisk("");
            setError(true);
            setVisible(false);
        } else if (totalSum <= 14) {
            setRisk(" low");
            setVisible(true);
            setError(false);
        } else if (totalSum <= 21) {
            setRisk(" medium");
            setVisible(true);
            setError(false);
        } else {
            setRisk(" high");
            setVisible(true);
            setError(false);
        }
    }

    return (

        <div>
            <PortfolioNav />
            <div className='wrapper'>
                <div>
                    <label class="label"> I plan on using the money I am investing:</label>
                    <Select options={options1} onChange={(e) => setCount1(e.value)}></Select>
                </div>

                <div>
                    <label class="label">My investments make up this share of assets (excluding home):</label>
                    <Select options={options2} onChange={(e) => setCount2(e.value)}></Select>
                </div>

                <div>
                    <label class="label"> I expect my future income to:</label>
                    <Select options={options3} onChange={(e) => setCount3(e.value)}></Select>
                </div>

                <div>
                    <label class="label"> I have emergency savings:</label>
                    <Select options={options4} onChange={(e) => setCount4(e.value)}></Select>
                </div>

                <div>
                    <label class="label"> I have invested in stocks and stock mutual funds:</label>
                    <Select options={options5} onChange={(e) => setCount5(e.value)}></Select>
                </div>

                <div>
                    <label class="label">I would risk this share of my portfolio in exchange for the same probability of doubling my money:</label>
                    <Select options={options6} onChange={(e) => setCount6(e.value)}></Select>
                </div>

                <div>
                    <label class="label">My most important investment goal is to: </label>
                    <Select options={options7} onChange={(e) => setCount7(e.value)}></Select>
                </div>

                <Button class="label" onClick={calcResults}>
                    Get results
                </Button>

                <div class="riskLevel">
                    {visible && (<div class="riskLevel">
                        Your risk tolerance is:
                        <text>
                            {risk}
                        </text>
                    </div>)}
                </div>

                <div class="showError">
                    {error && (<div class="label">
                        The form is incomplete
                    </div>)}
                </div>

            </div>

        </div>
    );
}
