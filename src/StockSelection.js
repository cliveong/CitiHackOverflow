import React, { useState, useContext } from 'react';
import PortfolioNav from "./PortfolioNav";
import "./StockSelection.css";
import Select from 'react-select';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { Context } from "./Context";

const riskLevels = [
    { value: '1', label: '' },
    { value: '2', label: 'Low' },
    { value: '3', label: 'Med' },
    { value: '4', label: 'High' }
] 

export default function() {

    

    function dropDown() {
        return (
                <Select className='selectRisk' options={riskLevels} onChange={e => setRisk(e.label)}/>
        )
    }

    function buttons(index) {
        return (
            <>
                {/* <Button className="stockEditBtn" onClick={()=> null}>Edit</Button> */}
                <Button className="stockDeleteBtn" onClick={() => deleteData(index)}>Delete</Button>
            </>
        )
    }

    function addData() {
      setData([...data, {index: data.length + 1, ticker: stk, risk:risk, date:currDate, comment:comment}]);
      setShow(false);
      // console.log(data);
      // console.log(stk);
      // console.log(comment);
      // console.log(risk);
    }

    function deleteData(index) {
      const newData = [...data];
      newData.splice(index - 1, 1);
      newData.forEach(element => {
        element.index = newData.indexOf(element, 0) + 1;
      });
      console.log(newData);
      setData(newData);
    }

    const time = new Date();
    const currDate = `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
    const [user, setUser, data, setData] = useContext(Context);
    const [show, setShow] = useState(false);
    const [stk, setStk] = useState("");
    const [comment, setComment] = useState("");
    const [risk, setRisk] = useState("High");

    return (

        <div>
            <PortfolioNav/>
            <div style={{marginTop:"20px"}}>
              <text>Recommendations: </text>
              <button className="stockEditBtn" onClick={() => setShow(true)}>Add</button>

            </div>
            
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
                {data.map((stock) => (
                <tbody  className='stocktbody'>
                    <tr className='stocktbodytr stocktr'>
                        <td>{stock.index}</td>
                        <td>{stock.ticker}</td>
                        <td>{stock.risk}</td>
                        <td>{stock.date}</td>
                        <td>{stock.comment}</td>
                        <td>{buttons(stock.index)}</td>
                    </tr>
                </tbody>
                ))}
            </table>
            <Modal isOpen={show}>
                  <ModalBody>
                    <div class="sslabel">
                      <text>Stock</text>
                      <input onChange={(e) => setStk(e.target.value)}></input>
                    </div>
                    <div class="sslabel">
                      <text>Comments</text>
                      <input onChange={(e) => setComment(e.target.value)}></input>
                    </div>
                    <div class="sslabel">
                      <text>Risk level</text>
                      {dropDown()}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={addData}>Add</Button>
                    <Button onClick={()=> setShow(false)}>Close</Button>
                  </ModalFooter>
            </Modal>
        </div>
        
    );
}


