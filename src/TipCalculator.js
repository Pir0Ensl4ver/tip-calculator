import React, { useState, useEffect } from "react";

import useInput from "./hooks/use-input";
import TipCalculatorButton from "./TipCalculatorButton";

import Card from "./UI/Card";
import { DollarIcon, PersonIcon } from "./UI/Icons/Icons";

import classes from "./TipCalculator.module.css";

const isPositiveNumber = (value) => {
  if (!value) {
    return false;
  }
  return !isNaN(value) && parseFloat(value) > 0;
};

const isPositiveNumberAndUnderOrEqualHundred = (value) => {
  if (!value) {
    return false;
  }
  return !isNaN(value) && parseFloat(value) > 0 && parseFloat(value) <= 100;
};

const TipCalculator = () => {
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [tipButtonValue, setTipButtonValue] = useState(0);
  const [tipButtonIsClicked, setTipButtonIsClicked] = useState(false);

  const {
    value: billValue,
    isValid: billIsValid,
    hasError: billHasError,
    valueChangeHandler: billChangeHandler,
    inputBlurHandler: billBlurHandler,
    reset: resetBill,
  } = useInput(isPositiveNumber);

  const {
    value: customPercentValue,
    isValid: customPercentIsValid,
    hasError: customPercentHasError,
    valueChangeHandler: percentChangeHandler,
    inputBlurHandler: percentBlurHandler,
    reset: resetCustomPercent,
  } = useInput(isPositiveNumberAndUnderOrEqualHundred);

  const {
    value: peopleNumberValue,
    isValid: peopleNumberIsValid,
    hasError: peopleNumberHasError,
    valueChangeHandler: peopleNumberChangeHandler,
    inputBlurHandler: peopleNumberBlurHandler,
    reset: resetPeopleNumber,
  } = useInput(isPositiveNumber);

  useEffect(() => {
    const billFloat = parseFloat(billValue);
    const numberOfPeopleInt = parseInt(peopleNumberValue);
    let percentFloat = parseFloat(customPercentValue);

    if (billIsValid && peopleNumberIsValid) {
      if (tipButtonIsClicked) {
        percentFloat = parseFloat(tipButtonValue);
      } else if (customPercentIsValid) {
        percentFloat = parseFloat(customPercentValue);
      } else {
        percentFloat = 0;
      }

      const tipAmount = billFloat * (percentFloat / 100);
      const tipPerPerson = tipAmount / numberOfPeopleInt;
      const totalPerPerson = (billFloat + tipAmount) / numberOfPeopleInt;

      setTipPerPerson(tipPerPerson);
      setTotalPerPerson(totalPerPerson);
    }
  }, [
    tipButtonIsClicked,
    tipButtonValue,
    billValue,
    billIsValid,
    peopleNumberValue,
    peopleNumberIsValid,
    customPercentValue,
    customPercentIsValid,
  ]);

  const onClickSetTipValueButtonHandler = (event) => {
    setTipButtonValue(event.target.value);
    setTipButtonIsClicked(true);
  };

  const onClickResetButtonHandler = () => {
    resetBill();
    resetCustomPercent();
    resetPeopleNumber();
    setTipPerPerson(0);
    setTotalPerPerson(0);
  };

  const percentValues = [5, 10, 15, 25, 50];

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
                type="number"
                value={billValue}
                onChange={billChangeHandler}
                onBlur={billBlurHandler}
                placeholder="0"
              />
            </div>
          </section>
          <section className={classes[`tip-calculator-left-section-second`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>Select Tip %</h3>
            <div className={classes[`tip-calculator-button-container`]}>
              {percentValues.map((value) => {
                return (
                  <TipCalculatorButton
                    key={value}
                    value={value}
                    onClick={onClickSetTipValueButtonHandler}
                  >
                    {value}%
                  </TipCalculatorButton>
                );
              })}
              <input
                className={classes[`tip-calculator-custom-input`]}
                type="number"
                value={customPercentValue}
                onChange={percentChangeHandler}
                onBlur={percentBlurHandler}
                placeholder="Custom"
              />
            </div>
          </section>
          <section className={classes[`tip-calculator-left-section-third`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>
              Number of People
            </h3>
            <div className={classes[`tip-calculator-input-background`]}>
              <PersonIcon />
              <input
                className={classes[`tip-calculator-input`]}
                type="number"
                value={peopleNumberValue}
                onChange={peopleNumberChangeHandler}
                onBlur={peopleNumberBlurHandler}
                placeholder="0"
              />
            </div>
          </section>
        </div>
        <div className={classes[`tip-calculator-right-section`]}>
          <section className={classes[`tip-calculator-right-section-first`]}>
            <div
              className={classes[`tip-calculator-right-section-p-container`]}
            >
              <p className={classes[`tip-calculator-right-section-info-p`]}>
                Tip Amount
              </p>
              <p className={classes[`tip-calculator-right-section-person-p`]}>
                / person
              </p>
            </div>
            <label
              className={classes[`tip-calculator-right-section-tip-display`]}
            >
              ${tipPerPerson.toFixed(2)}
            </label>
          </section>
          <section className={classes[`tip-calculator-right-section-second`]}>
            <div
              className={classes[`tip-calculator-right-section-p-container`]}
            >
              <p className={classes[`tip-calculator-right-section-info-p`]}>
                Total
              </p>
              <p className={classes[`tip-calculator-right-section-person-p`]}>
                / person
              </p>
            </div>
            <label
              className={classes[`tip-calculator-right-section-tip-display`]}
            >
              ${totalPerPerson.toFixed(2)}
            </label>
          </section>
          <section className={classes[`tip-calculator-right-section-third`]}>
            <TipCalculatorButton
              onClick={onClickResetButtonHandler}
              className={classes[`tip-calculator-button-reset`]}
            >
              RESET
            </TipCalculatorButton>
          </section>
        </div>
      </div>
    </Card>
  );
};

export default TipCalculator;
