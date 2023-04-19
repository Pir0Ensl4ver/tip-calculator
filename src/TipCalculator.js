import React, { useState } from "react";

import TipCalculatorButton from "./TipCalculatorButton";
import Card from "./UI/Card";
import { DollarIcon, PersonIcon } from "./UI/Icons/Icons";

import classes from "./TipCalculator.module.css";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const percentValues = [5, 10, 15, 25, 50];

  const onClickBillInputHandler = (event) => {
    setBillAmount(event.target.value);
  };

  const onClickTipPercentageInputHandler = (event) => {
    setTipPercentage(event.target.value);
  };

  const onClickPercentValueButtonHandler = (event) => {
    setTipPercentage(event.target.value);
  };

  const onClickIsButtonclickedHandler = (event) => {
    setIsButtonClicked(true);
  };

  const onClickResetValuesHandler = () => {
    setBillAmount("");
    setTipPercentage("");
    setTotalTip(0);
    setTotalAmount(0);
  };

  return (
    <Card>
      <div className={classes[`tip-calculator`]}>
        <div className={classes[`tip-calculator-left-section`]}>
          <section className={classes[`tip-calculator-left-section-first`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>Bill</h3>
            <div className={classes[`tip-calculator-input-background`]}>
              <DollarIcon />
              <input
                className={classes[`tip-calculator-input`]}
                value={billAmount}
                onChange={onClickBillInputHandler}
              />
            </div>
          </section>
          <section className={classes[`tip-calculator-left-section-second`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>Select Tip %</h3>
            <div className={classes[`tip-calculator-button-container`]}>
              {percentValues.map((value) => {
                return (
                  <TipCalculatorButton
                    value={value}
                    onClick={onClickPercentValueButtonHandler}
                  >
                    {value}%
                  </TipCalculatorButton>
                );
              })}
              {!isButtonClicked ? (
                <button onClick={onClickIsButtonclickedHandler}>
                  Custom value
                </button>
              ) : (
                <input
                  className={classes[`tip-calculator-custom-input`]}
                  placeholder="Custom"
                  value={tipPercentage}
                  onChange={onClickTipPercentageInputHandler}
                />
              )}
            </div>
          </section>
          <section className={classes[`tip-calculator-left-section-third`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>
              Number of People
            </h3>
            <div className={classes[`tip-calculator-input-background`]}>
              <PersonIcon />
              <input className={classes[`tip-calculator-input`]} />
            </div>
          </section>
        </div>
        <div className={classes[`tip-calculator-right-section`]}>
          <section className={classes[`tip-calculator-right-section-first`]}>
            <p className={classes[`tip-calculator-right-section-info-p`]}>
              Tip Amount
            </p>
            <p className={classes[`tip-calculator-right-section-person-p`]}>
              / person
            </p>
            <label
              className={
                classes[`tip-calculator-right-section-tip-display-first`]
              }
            >
              $4.27
            </label>
          </section>
          <section className={classes[`tip-calculator-right-section-second`]}>
            <p className={classes[`tip-calculator-right-section-info-p`]}>
              Total
            </p>
            <p className={classes[`tip-calculator-right-section-person-p`]}>
              / person
            </p>
            <label
              className={
                classes[`tip-calculator-right-section-tip-display-second`]
              }
            >
              $32.79
            </label>
          </section>
          <section>
            <button
              className={classes[`custom-button`]}
              onClick={onClickResetValuesHandler}
            >
              Reset
            </button>
          </section>
        </div>
      </div>
    </Card>
  );
};

export default TipCalculator;
