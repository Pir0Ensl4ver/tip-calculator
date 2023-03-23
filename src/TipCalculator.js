import React, { useState } from "react";
import TipCalculatorButton from "./TipCalculatorButton";
import Card from "./UI/Card";

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
        <h1 className={classes[`tip-calculator-h1`]}>Tip Calculator</h1>
        {percentValues.map((value) => {
          return (
            <TipCalculatorButton
              className={classes[`custom-button`]}
              value={value}
              onClick={onClickPercentValueButtonHandler}
            >
              {value}%
            </TipCalculatorButton>
          );
        })}
        <input
          className={classes[`tip-calculator-input`]}
          type="number"
          placeholder="Bill Amount"
          value={billAmount}
          onChange={onClickBillInputHandler}
        />
        {!isButtonClicked ? (
          <button
            className={classes[`custom-button`]}
            onClick={onClickIsButtonclickedHandler}
          >
            Custom value
          </button>
        ) : (
          <input
            className={classes[`tip-calculator-input`]}
            type="number"
            placeholder="Tip Percentage"
            value={tipPercentage}
            onChange={onClickTipPercentageInputHandler}
          />
        )}

        <button
          className={classes[`custom-button`]}
          onClick={onClickResetValuesHandler}
        >
          Reset
        </button>
        <div>
          <p className={classes[`tip-calculator-p`]}>Total Tip: ${totalTip}</p>
          <p className={classes[`tip-calculator-p`]}>
            Total Amount: ${totalAmount}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TipCalculator;
