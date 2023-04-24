import React, { useState, useEffect } from "react";

import useInput from "./hooks/use-input";
import TipCalculatorButton from "./TipCalculatorButton";

import Card from "./UI/Card";
import { DollarIcon, PersonIcon } from "./UI/Icons/Icons";

import classes from "./TipCalculator.module.css";

const IsEqualOrAboveZero = (value) => value >= 0;
const isBetweenZeroAndOneHundred = (value) => value > 0 && value <= 100;

const TipCalculator = () => {
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  const {
    value: billValue,
    isValid: billIsValid,
    hasError: billHasError,
    valueChangeHandler: billChangeHandler,
    inputBlurHandler: billBlurHandler,
    reset: resetBill,
  } = useInput(IsEqualOrAboveZero);

  const {
    value: percentValue,
    isValid: custovPercentIsValid,
    hasError: customPercentHasError,
    valueChangeHandler: percentChangeHandler,
    inputBlurHandler: percentBlurHandler,
    reset: resetCustomPercent,
  } = useInput(isBetweenZeroAndOneHundred);

  const {
    value: peopleNumberValue,
    isValid: peopleNumberIsValid,
    hasError: peopleNumberHasError,
    valueChangeHandler: peopleNumberChangeHandler,
    inputBlurHandler: peopleNumberBlurHandler,
    reset: resetPeopleNumber,
  } = useInput(IsEqualOrAboveZero);

  useEffect(() => {
    const billFloat = parseFloat(billValue);
    const numberOfPeopleInt = parseInt(peopleNumberValue);
    const percentFloat = parseFloat(percentValue);

    if (
      !isNaN(billFloat) &&
      !isNaN(numberOfPeopleInt) &&
      !isNaN(percentFloat)
    ) {
      const tipAmount = billFloat * (percentFloat / 100);
      const tipPerPerson = tipAmount / numberOfPeopleInt;
      const totalPerPerson = (billFloat + tipAmount) / numberOfPeopleInt;

      setTipPerPerson(tipPerPerson);
      setTotalPerPerson(totalPerPerson);
    } else {
      setTipPerPerson(0);
      setTotalPerPerson(0);
    }
  }, [billValue, peopleNumberValue, percentValue]);

  const onClickResetButtonHandler = () => {
    resetBill();
    resetCustomPercent();
    resetPeopleNumber();
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
                value={billValue}
                onChange={billChangeHandler}
                onBlur={billBlurHandler}
              />
            </div>
          </section>
          <section className={classes[`tip-calculator-left-section-second`]}>
            <h3 className={classes[`tip-calculator-input-h3`]}>Select Tip %</h3>
            <div className={classes[`tip-calculator-button-container`]}>
              {percentValues.map((value) => {
                return (
                  <TipCalculatorButton onClick={percentChangeHandler}>
                    {value}%
                  </TipCalculatorButton>
                );
              })}
              <input
                className={classes[`tip-calculator-custom-input`]}
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
                onChange={peopleNumberChangeHandler}
                onBlur={peopleNumberBlurHandler}
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
              {tipPerPerson}
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
              {totalPerPerson}
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
