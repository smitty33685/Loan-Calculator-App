import React, { useEffect } from "react";
import { API_URL } from "./utils/constants";
import "./App.scss";

const App = () => {
  const amoutRange = (val: string) => {
    console.log(val);
  };

  const termRange = (val: string) => {
    console.log(val);
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  const getConfiguration = async () => {
    try {
      const response = await fetch(`${API_URL}/constraints`);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoanInfo = async () => {
    const amount = 0;
    const term = 0;

    try {
      const response = await fetch(`${API_URL}/real-first-loan-offer?amount=${amount}&term=${term}`);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="calculator">
      <section className="loan-choice">
        <div className="slider-amount">
          <div className="form-group">
            <label>Total amount</label>
            <div className="select-wrapper">
              <select id="amount">
                <option value="300">300</option>
              </select>
              <p className="amount-value">$</p>
            </div>
          </div>
          <input
            type="range"
            id="amount-range"
            min="300"
            max="8000"
            step="100"
            onChange={event => amoutRange(event.target.value)}
          />
          <div className="flex-group">
            <p className="m-0 medium-font">$300</p>
            <p className="m-0 medium-font">$800</p>
          </div>
        </div>
        <div className="slider-term">
          <div className="form-group">
            <label>Term</label>
            <div className="select-wrapper">
              <select>
                <option value="7">7</option>
              </select>
              <p className="term-value small-font">days</p>
            </div>
          </div>
          <input
            type="range"
            id="term-range"
            min="7"
            max="30"
            step="1"
            onChange={event => termRange(event.target.value)}
          />
          <div className="flex-group">
            <p className="m-0 medium-font">7</p>
            <p className="m-0 medium-font">30</p>
          </div>
        </div>
      </section>
      <section className="loan-info">
        <div className="flex-group border-bottom-black">
          <p>Loan</p>
          <p>$1,000.00 MXN</p>
        </div>
        <div className="flex-group border-bottom-black">
          <p>Term</p>
          <p>18 days</p>
        </div>
        <div className="flex-group border-bottom-black">
          <p>Interest</p>
          <div>
            <p className="mb-0">$271.44 MXN</p>
            <p className="small-font text-center">VAT included</p>
          </div>
        </div>
        <div className="flex-group border-bottom-black">
          <p>Commission per disposition</p>
          <div>
            <p className="mb-0">$1,358.44 MXN</p>
            <p className="small-font text-center">VAT included</p>
          </div>
        </div>
        <div className="flex-group border-bottom-black">
          <p>
            <strong>Amount payable</strong>
          </p>
          <div>
            <p className="mb-0">
              <strong>$1,358.44 MXN</strong>
            </p>
            <p className="small-font text-center">VAT included</p>
          </div>
        </div>
        <div className="flex-group border-bottom-black">
          <p>
            <strong>Payment date</strong>
          </p>
          <p>
            <strong>23/APR/2022</strong>
          </p>
        </div>

        <section className="text-content">
          <p>
            <strong>CAT: 7051.76 %</strong> average without VAT for informational and comparison purposes only.
          </p>
          <p>Calculation date: 15/APR/2022</p>
          <p>Calculator for informational and comparison purposes.</p>
          <p>We never request advances, fees, policy payments or any other concept to grant you a loan.</p>
        </section>

        <button onClick={getLoanInfo} className="btn-primary">
          Request it now
        </button>
      </section>
    </main>
  );
};

export default App;
