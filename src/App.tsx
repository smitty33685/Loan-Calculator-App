import React, { useEffect, useState } from "react";
import { API_URL } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types/types";
import { setConfiguration, setInformation } from "./actions";
import "./App.scss";

const App = () => {
  const calculatorConfiguration = useSelector((state: RootState) => state.calculatorConfiguration);
  const loanInformation = useSelector((state: RootState) => state.loanInformation);
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const dispatch = useDispatch();

  const amoutRange = (val: string) => {
    setAmount(Number(val));
  };

  const termRange = (val: any) => {
    setTerm(Number(val));
  };

  useEffect(() => {
    // TODO FIGURE OUT HOW TO CALL IT
    Promise.all([getConfiguration(), getLoanInfo()]);
  }, []);

  // TODO FIGURE OUT BETTER SOLUTION
  useEffect(() => {
    setAmount(calculatorConfiguration.amountInterval?.defaultValue);
    setTerm(calculatorConfiguration.termInterval?.defaultValue);
  }, [calculatorConfiguration]);

  const getConfiguration = async () => {
    try {
      const response = await fetch(`${API_URL}/constraints`);
      const data = await response.json();

      dispatch(setConfiguration(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getLoanInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/real-first-loan-offer?amount=${amount}&term=${term}`);
      const data = await response.json();

      dispatch(setInformation(data));
    } catch (error) {
      console.log(error);
    }
  };

  const showContent = () => {
    return Object.entries(calculatorConfiguration).length && Object.entries(loanInformation).length;
  };

  return (
    <>
      {!showContent() && (
        <main className="loader">
          <h1>Načítání...</h1>
        </main>
      )}
      {showContent() && (
        <main className="calculator">
          <section className="loan-choice">
            <div className="slider-amount">
              <div className="form-group">
                <label>Total amount</label>
                <div className="select-wrapper">
                  <select id="amount">
                    {/* TODO SET OPTIONS */}
                    <option value="300">300</option>
                  </select>
                  <p className="amount-value">$</p>
                </div>
              </div>
              <input
                type="range"
                id="amount-range"
                min={calculatorConfiguration.amountInterval.min}
                max={calculatorConfiguration.amountInterval.max}
                step={calculatorConfiguration.amountInterval.step}
                onChange={event => amoutRange(event.target.value)}
              />
              <div className="flex-group">
                <p className="m-0 medium-font">${calculatorConfiguration.amountInterval.min}</p>
                <p className="m-0 medium-font">${calculatorConfiguration.amountInterval.max}</p>
              </div>
            </div>
            <div className="slider-term">
              <div className="form-group">
                <label>Term</label>
                <div className="select-wrapper">
                  <select>
                    {/* TODO SET OPTIONS */}
                    <option value="7">7</option>
                  </select>
                  <p className="term-value small-font">days</p>
                </div>
              </div>
              <input
                type="range"
                id="term-range"
                min={calculatorConfiguration.termInterval.min}
                max={calculatorConfiguration.termInterval.max}
                step={calculatorConfiguration.termInterval.step}
                onChange={event => termRange(event.target.value)}
              />
              <div className="flex-group">
                <p className="m-0 medium-font">{calculatorConfiguration.termInterval.min}</p>
                <p className="m-0 medium-font">{calculatorConfiguration.termInterval.max}</p>
              </div>
            </div>
          </section>
          <section className="loan-info">
            <div className="flex-group border-bottom-black">
              <p>Loan</p>
              <p>${loanInformation.totalPrincipal} MXN</p>
            </div>
            <div className="flex-group border-bottom-black">
              <p>Term</p>
              <p>{loanInformation.term} days</p>
            </div>
            <div className="flex-group border-bottom-black">
              <p>Interest</p>
              <div>
                <p className="mb-0">${loanInformation.totalCostOfCredit} MXN</p>
                <p className="small-font text-center">VAT included</p>
              </div>
            </div>
            <div className="flex-group border-bottom-black">
              <p>Commission per disposition</p>
              <div>
                <p className="mb-0">${loanInformation.monthlyPayment} MXN</p>
                <p className="small-font text-center">VAT included</p>
              </div>
            </div>
            <div className="flex-group border-bottom-black">
              <p>
                <strong>Amount payable</strong>
              </p>
              <div>
                <p className="mb-0">
                  <strong>{loanInformation.totalRepayableAmount} MXN</strong>
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
      )}
    </>
  );
};

export default App;
