import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './EditProductForm.css'


function EditProductForm() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');


  const [productname, setProductname] = useState('');
  const [antal, setAntal] = useState('');
  const [pris, setPris] = useState('');
  const [summa, setSumma] = useState('');
  const [moms, setMoms] = useState('');
  const [tot, setTot] = useState('');

  useEffect(() => {
     fetchProducts();
  }, ); /// denna uppdaterar listan varje gång :-) !!!!!


  const fetchProducts= async () => {
    try {
      const response = await axios.get('/api/products');
      // const response = await axios.get('http://localhost:5000/api/products'); // STAR!
     

      console.log('-------------------------response from fetchProducts: =   ' + response)
      setProducts(response.data);
      console.log('--DATA---------------------response.data from fetchProducts: =   ' + response.data)
    } catch (error) {
      console.error('Error fetching Products:', error);
    }
  };



  const handleUpdateProduct = async () => {
    try {

      // Manual validation
    if (!productname) {
      alert('Fyll i produktnamn');
      return;
    }
    if ( !pris ) {
      alert('Fyll i pris');
      return;
    }
   


        const updatedProduct = {
            productname,
            pris,
         //   antal,
         //   pris,
         //   summa,
         //   moms,
         //   tot,
        };

      await axios.put(`/api/products/${selectedProduct}`, updatedProduct);
      
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating Product:', error);
      alert('Failed to update Product.');
    }
  };

  const handleSelectProduct = (productId) => {
    const selected = products.find((product) => product._id === productId);
    if (selected) {
      setSelectedProduct(selected._id);
      setProductname(selected.productname);
      setPris(selected.pris);
      //setAntal(selected.antal);
      //setSumma(selected.summa);
      //setMoms(selected.moms);
      //setTot(selected.tot);  
    }
  };

  return (
    <div>
      <h2>Ändra Produkt</h2>

      <div>
        <label>Välj:</label>
        
        <select value={selectedProduct} onChange={(e) => handleSelectProduct(e.target.value)}>
          <option value="">Produktnamn</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.productname}
            </option>
          ))}
        </select>
      </div>
      <br></br>

      <input
        type="text"
        value={productname}
        onChange={(e) => setProductname(e.target.value)}
        placeholder="Produktnamn"
        required
      />
      <input
        type="text"
        value={pris}
        onChange={(e) => setPris(e.target.value)}
        placeholder="Pris"
        required
      />
<button onClick={handleUpdateProduct}>Uppdatera Produkt</button>
{/** 
       <input
     
        type="text"
        value={antal}
        onChange={(e) => setAntal(e.target.value)}
        placeholder="Antal"
        required
      />
     
      <input
        type="text"
        value={summa}
        onChange={(e) => setSumma(e.target.value)}
        placeholder="Summa"
        required
      />
       <input
        type="text"
        value={moms}
        onChange={(e) => setMoms(e.target.value)}
        placeholder="Moms"
        required
      />
       <input
        type="text"
        value={tot}
        onChange={(e) => setTot(e.target.value)}
        placeholder="Tot"
        required
      />

      
*/}
    </div>
  );
}

export default EditProductForm;
