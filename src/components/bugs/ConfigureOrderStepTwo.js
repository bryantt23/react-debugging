import React, { useState, useEffect } from 'react';
import { pageStates } from './pageStates';

const ConfigureOrderStepTwo = ({
  city = '',
  product = '',
  setSubmitEnabled,
  setPageState,
  setSelectedModel,
  selectedModel
}) => {
  const [models, setModels] = useState([]);

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // if (city && product && selectedModel) {
    //   debugger;
    //   fetch(`/rest/stock/${city}/${product}`)
    //     .then(res => res.json())
    //     .then(json => setModels(json.models));
    //   fetch(`/rest/color/${city}/${product}/${selectedModel}`)
    //     .then(res => res.json())
    //     .then(json => setColors(json.colors));
    // }
  }, []);

  useEffect(() => {
    fetch(`/rest/stock/${city}/${product}`)
      .then(res => res.json())
      .then(json => setModels(json.models));

    fetch(`/rest/color/${city}/${product}/${selectedModel}`)
      .then(res => res.json())
      .then(json => {
        console.log(
          '🚀 ~ file: ConfigureOrderStepTwo.js ~ line 39 ~ useEffect ~ json',
          json
        );
        setColors(json.colors);
      });

    if (selectedModel && selectedColor && quantity) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [city, product, selectedModel, selectedColor, quantity]);

  return (
    <div>
      <h2> Set Order Details </h2>
      <form>
        <div>
          Model
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
          >
            <option value={''} />
            {models.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          Color
          <select
            value={selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
          >
            <option value={''} />
            {colors
              ? colors.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))
              : ''}
          </select>
        </div>
        <div>
          Quantity
          <input
            value={quantity}
            type='number'
            min='0'
            step='1'
            onChange={e => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </form>
    </div>
  );
};

export default ConfigureOrderStepTwo;
