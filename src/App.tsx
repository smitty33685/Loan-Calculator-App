import React, { useEffect, useState } from "react";
import { API_URL } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types/types";
import { setConfiguration, setInformation } from "./actions";
import Loader from "./components/loader/Loader";
import Error from "./components/error/Error";
import "./App.scss";

const App = () => {
  const calculatorConfiguration = useSelector((state: RootState) => state.calculatorConfiguration);
  const loanInformation = useSelector((state: RootState) => state.loanInformation);
  const [amount, setAmount] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [amountOptions, setAmountOptions] = useState<number[]>([]);
  const [termOptions, setTermOptions] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const amoutRange = (val: string) => {
    setAmount(Number(val));
  };

  const termRange = (val: any) => {
    setTerm(Number(val));
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    if (calculatorConfiguration.amountInterval && calculatorConfiguration.termInterval) {
      setAmount(calculatorConfiguration.amountInterval.defaultValue);
      setTerm(calculatorConfiguration.termInterval.defaultValue);
      getLoanInfo(
        calculatorConfiguration.amountInterval.defaultValue,
        calculatorConfiguration.termInterval.defaultValue,
      );

      setAmountSelect(calculatorConfiguration.amountInterval.min, calculatorConfiguration.amountInterval.max);
      setTermSelect(calculatorConfiguration.termInterval.min, calculatorConfiguration.termInterval.max);
    }
  }, [calculatorConfiguration]);

  const getConfiguration = async () => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/constraints`);
      const data = await response.json();

      dispatch(setConfiguration(data));
    } catch (error: any) {
      setError(error.name);
    }
  };

  const getLoanInfo = async (amountParam: number = amount, termParam: number = term) => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/real-first-loan-offer?amount=${amountParam}&term=${termParam}`);
      const data = await response.json();

      dispatch(setInformation(data));
    } catch (error: any) {
      setError(error.name);
    }
  };

  const setAmountSelect = (min: number, max: number) => {
    let options: number[] = [];

    for (let i = min; i <= max; i = i + 10) {
      options.push(i);
    }
    setAmountOptions(options);
  };

  const setTermSelect = (min: number, max: number) => {
    let options: number[] = [];

    for (let i = min; i <= max; i = i + 1) {
      options.push(i);
    }
    setTermOptions(options);
  };

  const showContent = () => {
    return Object.entries(calculatorConfiguration).length && Object.entries(loanInformation).length;
  };

  return (
    <>
      {error && <Error text={error} />}
      {!showContent() ? (
        <Loader text="Loading..." />
      ) : (
        <main className="calculator">
          <section className="loan-choice">
            <div className="slider-amount">
              <div className="form-group">
                <label>Total amount</label>
                <div className="select-wrapper">
                  <select id="amount" value={amount} onChange={event => amoutRange(event.target.value)}>
                    {amountOptions.map((el: number) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                  <p className="amount-value">$</p>
                </div>
              </div>
              <input
                type="range"
                id="amount-range"
                value={amount}
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
                  <select id="term" value={term} onChange={event => termRange(event.target.value)}>
                    {termOptions.map((el: number) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                  <p className="term-value small-font">days</p>
                </div>
              </div>
              <input
                type="range"
                id="term-range"
                value={term}
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

            <button onClick={() => getLoanInfo()} className="btn-primary">
              Request it now
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default App;
