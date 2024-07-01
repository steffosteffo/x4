import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './ProductForm.css';
function ProductForm() {

  const [product, setProduct] = useState({
    productname: '',
    antal: '',
    pris: '',
    summa: '',
    moms: '1.25', // Default moms value set to 25%
    tot: ''
  });

  useEffect(() => {
  },); 
  

  //Moms 
  const [moms, setMoms] = useState(1.25); // Default moms value in dropdown

  const handleSelectMoms = (selectedMoms) => {
    // Set selected moms value only if a value is selected, otherwise keep it as default (1.25)
    const newMoms = selectedMoms ? selectedMoms : 1.25;
    setProduct({ ...product, moms: newMoms });
    setMoms(newMoms); // Update the selected moms state
  };

  //Produktnamn
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //Spara knappen
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post('/api/products', product);
      console.log('API Response:', response.data); // Log API response
      setProduct({ productname: '', antal: '', pris: '', summa: '', moms: '1.25', tot: '' });  // Reset moms to default after submission
      alert('Product submitted successfully!');
      
       setMoms(1.25); /// steffo!!
       
    } catch (error) {
      alert('Product submission failed!');
      console.error('Error adding product:', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    }
  };

 
  return (
    <div>
        <h2>Registerera Produkt</h2>
        <form  onSubmit={handleSubmit}>
 
            <input
              type="text"
              name="productname"
              value={product.productname}
              onChange={handleInputChange}
              placeholder="Skriv Produktnamn"
              required
            />
             <input
              type="text"
              name="pris"
              value={product.pris}
              onChange={handleInputChange}
              placeholder="Skriv pris"
              required
            />
            <button className="product-btn"  type="submit">Lägg till produkt</button>
            {/** 
            <input
              type="text"
              name="antal"
              value={product.antal}
              onChange={handleInputChange}
              placeholder="skriv antal"
              required
            />
           
            <input
              type="text"
              name="summa-"
              value={product.summa = product.antal * product.pris} //18 steffo
              readOnly
              style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }} // Inline styling for gray background
              onChange={handleInputChange}
            />
          <input
            type="text"
            name="moms"
            value={product.moms}
            readOnly
            style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }} // Inline styling for gray background
            onChange={handleInputChange}
          />
         */} 
   
 {/**
          <div className="form-group">
            <label htmlFor="fee">MOMS:</label>
            <select
              id="moms"
              value={moms}
              onChange={(e) => handleSelectMoms(e.target.value)} // Call handleSelectMoms on change
            >
              <option value="">Select Moms</option>
              <option value={0}>0%</option>   
              <option value={1.12}>12%</option>
              <option value={1.25}>25%</option>
              <option value={1.75}>75%</option>
            </select>
          </div>
        */} 
     
        </form>
      </div> 
  );
}

export default ProductForm;


