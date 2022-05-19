import React, { useState, useEffect } from 'react';
import { pageStates } from './pageStates';

const ConfigureOrderStepOne = ({
  city,
  product,
  setCity,
  setProduct,
  setPageState
}) => {
  // keep track of selected option
  const [newCity, setNewCity] = useState(city);
  const [newProduct, setNewProduct] = useState(product);

  useEffect(() => {
    setCity(newCity);
    setProduct(newProduct);
    if (newCity === '' || newProduct === '') {
      setPageState(pageStates.firstNotReady);
    } else {
      setPageState(pageStates.firstReady);
    }
  }, [newCity, newProduct]);

  // load options from backend
  const [cities, setCities] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    fetch(`/rest/cities`)
      .then(res => res.json())
      .then(json => setCities(json.cities));

    fetch(`/rest/product_categories`)
      .then(res => res.json())
      .then(json => setProductCategories(json.product_categories));
  }, []);

  const submit = _ => {
    setCity(newCity);
    setProduct(newProduct);
  };

  return (
    <div>
      {JSON.stringify(newCity)}
      {newProduct}

      <h2> Set Source Warehouse </h2>
      <form>
        <div>
          Warehouse location:
          <select value={newCity} onChange={e => setNewCity(e.target.value)}>
            <option value='' />
            {cities.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          Product Category:
          <select
            value={newProduct}
            onChange={e => setNewProduct(e.target.value)}
          >
            <option value='' />
            {productCategories.map(pc => (
              <option key={pc} value={pc}>
                {pc}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default ConfigureOrderStepOne;
