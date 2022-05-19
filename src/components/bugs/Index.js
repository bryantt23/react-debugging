import React, { useState } from 'react';
import ConfigureOrderStepOne from './ConfigureOrderStepOne';
import ConfigureOrderStepTwo from './ConfigureOrderStepTwo';
import { pageStates } from './pageStates';

const Index = () => {
  const [submitEnabled, setTheSubmitEnabled] = useState(false);
  // let submitEnabled = false;
  const setSubmitEnabled = enabled => {
    // submitEnabled = enabled;
    setTheSubmitEnabled(enabled);
  };

  const [pageState, setPageState] = useState(pageStates.firstNotReady);

  const [city, setCity] = useState('');
  const [product, setProduct] = useState('');
  const [showConfigureOrderStepOne, setShowConfigureOrderStepOne] =
    useState(true);
  const [showConfigureOrderStepTwo, setShowConfigureOrderStepTwo] =
    useState(false);
  const [message, setMessage] = useState('');
  const [readyForStep2, setReadyForStep2] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');

  const moveToStepOne = () => {
    setShowConfigureOrderStepOne(true);
    setShowConfigureOrderStepTwo(false);
  };
  const moveToStepTwo = () => {
    setShowConfigureOrderStepOne(true);
    setShowConfigureOrderStepTwo(true);
  };

  const submitOrder = () => {
    fetch('/rest/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city,
        product,
        model: selectedModel,
        color,
        quantity
        // TODO: add the rest of the order here. We need:
        // - model: string
        // - color: string
        // - quantity: number
      })
    }).then(res =>
      res.status === 204
        ? setMessage('Order submitted successfully')
        : setMessage('Order submit failed')
    );
  };

  return (
    <div>
      {pageState}
      <h1>Configure Order</h1>
      {/* TODO: Hide ConfigureOrderStepOne when next button is pressed */}
      <div style={{ display: showConfigureOrderStepOne ? '' : 'none' }}>
        <ConfigureOrderStepOne
          setPageState={setPageState}
          city={city}
          product={product}
          setCity={setCity}
          setProduct={setProduct}
        />
      </div>
      <div style={{ display: showConfigureOrderStepTwo ? '' : 'none' }}>
        <ConfigureOrderStepTwo
          setPageState={setPageState}
          city={city}
          product={product}
          setSubmitEnabled={setSubmitEnabled}
          setSelectedModel={setSelectedModel}
          selectedModel={selectedModel}
        />
      </div>
      <div>
        <button onClick={moveToStepOne} disabled={showConfigureOrderStepOne}>
          Back
        </button>
        {/* TODO: I want to make this only enabled when the user has selected a city and product. */}
        <button
          onClick={moveToStepTwo}
          disabled={pageState !== pageStates.firstReady}
        >
          Next
        </button>
        <button onClick={submitOrder} disabled={!submitEnabled}>
          Submit
        </button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Index;
