import React, { useEffect, useState } from "react";
import { API_URL } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types/types";
import { setConfiguration, setInformation } from "./actions";
import Slider from "./components/slider/Slider";
import Loader from "./components/loader/Loader";
import RoundedLoader from "./components/rounded-loader/RoundedLoader";
import Error from "./components/error/Error";
import { saveToCache, readFromCache } from "./cache/cache";
import "./App.scss";

const App = () => {
  const calculatorConfiguration = useSelector((state: RootState) => state.calculatorConfiguration);
  const loanInformation = useSelector((state: RootState) => state.loanInformation);
  const [amount, setAmount] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [amountOptions, setAmountOptions] = useState<number[]>([]);
  const [termOptions, setTermOptions] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getConfiguration();
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    const cacheObj = readFromCache(`${amountParam}-${termParam}`);
    setError("");

    if (cacheObj) {
      dispatch(setInformation(cacheObj));
      return;
    }

    try {
      setShowLoader(true);
      const response = await fetch(`${API_URL}/real-first-loan-offer?amount=${amountParam}&term=${termParam}`);
      const data = await response.json();

      saveToCache(`${amountParam}-${termParam}`, data);
      dispatch(setInformation(data));
    } catch (error: any) {
      setError(error.name);
    } finally {
      setShowLoader(false);
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
          {showLoader && <RoundedLoader />}
          <section className="loan-choice">
            <div className="slider-amount">
              <Slider
                amount={amount}
                options={amountOptions}
                label="Total amount"
                valueClasses="amount-value"
                calculatorConfiguration={calculatorConfiguration.amountInterval}
                onChange={event => setAmount(Number(event.target.value))}
              />
            </div>
            <div className="slider-term">
              <Slider
                amount={term}
                options={termOptions}
                label="Term"
                valueClasses="term-value small-font"
                calculatorConfiguration={calculatorConfiguration.termInterval}
                onChange={event => setTerm(Number(event.target.value))}
              />
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
                <p className="mb-0">${String(loanInformation.monthlyPayment).slice(0, 8)} MXN</p>
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
