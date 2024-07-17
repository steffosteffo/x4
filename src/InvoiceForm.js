import React, { useState, useEffect, useRef } from 'react'; // useRef till PRINT
import { useReactToPrint } from 'react-to-print'; //PRINT
import { v4 as uuidv4 } from 'uuid'; // for id track utan post 
import axios from 'axios';
import './InvoiceForm.css'

import stefanImage from './stefan.gif'; // Assuming stefan.gif is in the same directory as this component

function InvoiceForm() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  //Customer ---;
  const [name, setNamn] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [webadress, setWebadress] = useState('');

  //PRODUCT -drop  down listan 
  const [productname, setProductname] = useState('');
  const [pris, setPris] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Invoice -dessa värden använder vi inte ännu!!!
  /*
  const [produkt, setProdukt] = useState('');
  const [antal, setAntal] = useState('');
  const [price, setPrice] = useState('');
  const [fee, setFee] = useState('');
*/

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      //const response = await axios.get('/api/customers');
      const response = await axios.get('http://steffohost.hopto.org:5000/api/customers');
      setCustomers(response.data);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Error fetching products: ' + error.message);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      //const response = await axios.get('/api/products');
      const response = await axios.get('http://steffohost.hopto.org:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products: ' + error.message);
      setLoading(false);
    }
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
      if (!selectedCustomer || !price || !fee) {
        alert('Please select a customer and enter both price and fee.');
        return;
      }
    const invoiceData = {
      customer: selectedCustomer,
      produkt: produkt,
      antal: parseFloat(antal),
      price: parseFloat(price),
      fee: parseFloat(fee),
    };
    try {
      await axios.post('/api/invoices', invoiceData);
      alert('Invoice submitted successfully!');
      setProdukt('');
      setAntal('');
      setPrice('');
      setFee('');
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert('Failed to submit invoice.');
    }
  };
   */
  const handleSelectCustomer = (customerId) => {
    const selected = customers.find((customer) => customer._id === customerId);
    if (selected) {
      setSelectedCustomer(selected._id);
      setNamn(selected.name);
      setPhone(selected.phone);
      setAdress(selected.adress)
      setEmail(selected.email);
      setWebadress(selected.webadress);
    }
  };

  const handleSelectProduct = (productId) => {
    const selected = products.find((product) => product._id === productId);
    if (selected) {

      setSelectedProduct(selected._id);

      //produkt drop down listan 
      setProductname(selected.productname);
      setPris(selected.pris);

      //Kopierar namn från drop downlistan till fälten nedanför :-) 
      product.productname = selected.productname //andre
      product.pris = selected.pris //andre
    }
  };

  ///////PRODUCT start -första gången ////////////////////////////////////////////////////////////////
  const [product, setProduct] = useState({
    productname: '',
    antal: '1',
    pris: '',
    summa: '',
    moms: '1.25', // Default moms value set to 25%
    tot: ''
  });

  //Hämta och sätt produktlista i faktura 
  const [productList, setProductList] = useState([]);

  useEffect(() => {
  }, []);
  // }, [setProduct]); xyz

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
    // setProduct((prevProduct) => ({ ...prevProduct, [name]: value })); //mmm
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Andra gången -och nästa ... nästa hela tiden 
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      //=== POST I DB ====
      //Tagit bort att lägga in data i PRODUCT tabell -vill
      // const response = await axios.post('/api/products', product);
      //console.log('API Response:', response.data); // Log API response
      //const newProduct = { ...product, id: response.data._id }; // Include id for tracking XXXXXXXXXXXXXXXXXXXX!!!!!
      //=== UTAN POST I DB ===
      const newProduct = { ...product, id: uuidv4() }; // OBS ANVÄNDER DEANNA ISTÄLLAET FÖR OVAN ID TRACK!!   
      console.log('New Product:', newProduct); // Log new product object with id
      setProductList([...productList, newProduct]);
      setProduct({ productname: '', antal: '1', pris: '', summa: '', moms: '1.25', tot: '' });  // Reset moms to default after submission
      alert('Produkt tillagd!');

      setMoms(1.25); /// steffo!!
      setSelectedProduct('') // Andre ;


    } catch (error) {
      alert('Product submission failed!');
      console.error('Error adding product:', error);
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    }
  };

  //Delete knappen
  const handleDeleteProduct = (itemId) => {  // productId
    const updatedList = productList.filter((item) => item.id !== itemId);
    setProductList(updatedList);
    alert('Produkt lyckades att tas bort!');
  };

  // Calculate total TOT across all products
  // specialfall om moms är 0% då måste vi kolla så inte hela summan blir noll vid multipikation mer fler värden 
  const totalTOT = productList.reduce((acc, item) => {
    const momsValue = parseFloat(item.moms); // Convert item.moms to a number
    const calculatedTOT = momsValue !== 0 ? (item.antal * item.pris * momsValue) : (item.antal * item.pris);
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>item.moms is now: ' + momsValue);
    return acc + calculatedTOT;
  }, 0);

  // Calculate total TOT across all products
  // Hela SUMMAN UTAN MOMS!!!
  const totalSumUtanMoms = productList.reduce((acc, item) => {
    const calculatedTotSumUtanMoms = (item.antal * item.pris);
    return acc + calculatedTotSumUtanMoms;
  }, 0);
  ///////PRODUCT slut ////////////////////////////////////////////////////////

  ////PRINT  start
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  ///PRINT end

  return (
    <div>

      <h2>Fakturera till Kund:</h2>
      <div class="container invoice">
        {/****  PRINT*****/}
        <div>
          <dt>&nbsp;</dt>
          <button onClick={handlePrint} >Utskrift!  </button>
        </div>


      {/*<form onSubmit={handleSubmit}>*/}
      <form >
        <div>
          <select className="form-input" value={selectedCustomer} onChange={(e) => handleSelectCustomer(e.target.value)}>
            <option type="text" value="">Välj Kund</option>
            {customers
              .slice() // Create a copy of the original array to avoid mutating it
              .sort((a, b) => {
                if (!a.name || !b.name) return 0; // Handle cases where name is undefined or null
                return a.name.localeCompare(b.name);
              }) // Sort customers alphabetically by name
              .map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
          </select>
        </div>
        {/* 
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setNamn(e.target.value)}
          placeholder="Ange Namn"
        />

        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ange Telefon"
        />
        <input
          type="text"
          id="adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          placeholder="Ange Adress"
        />
        <input
          type="text"
          id="email"
         value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ange E-mejl"
        />
        <input
          type="text"
          id="webadress"
          value={webadress}
          onChange={(e) => setWebadress(e.target.value)}
          placeholder="Ange Webbadress"
        />
*/}
      </form>


      <form >
        <div>
          <select className="form-input" value={selectedProduct} onChange={(e) => handleSelectProduct(e.target.value)}>
            <option type="text" value="">Välj Produkt</option>
            {products
              .slice() // Create a copy of the original array to avoid mutating it
              .sort((a, b) => {
                if (!a.productname || !b.productname) return 0; // Handle cases where name is undefined or null
                return a.productname.localeCompare(b.productname);
              }) // Sort customers alphabetically by name
              .map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productname}
                </option>
              ))}
          </select>
        </div>

        {/*   
        <input
          type="text"
          id="productname"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
          placeholder="Ange Produktnamn"
        />
        <input
          type="text"
          id="pris"
          value={pris}
          onChange={(e) => setPris(e.target.value)}
          placeholder="Ange Pris"
        />
*/}
      </form>


     

      {/************************************************** START PÅ TEMPLATE  ***********************************/}
      {/* <div class="container invoice">*/}
        <div class="invoice-header">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' />
        </div>
        {/* ProductForm.js*****************************START***********************************/}
        <form className="invoice-form">
          <label htmlFor="productName">
            <input
              placeholder="Ange Produkt"
              type="text"
              name="productname"

              value={product.productname} //star2



              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <input
              placeholder="Ange Antal"
              type="text"
              name="antal"
              value={product.antal}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            <input
              placeholder="Ange Pris"
              type="text"
              name="pris"
              value={product.pris}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            <div>
              <button onClick={handleProductSubmit}>Lägg till Produkt</button>
            </div>
          </label>



          <div className="form-group">
            <label htmlFor="fee">Moms:</label>
            <select
              id="moms"
              value={moms}
              onChange={(e) => handleSelectMoms(e.target.value)}
            >
              <option value="">Select Moms</option>
              <option value={0}>0%</option>
              <option value={1.06}>6%</option>
              <option value={1.12}>12%</option>
              <option value={1.25}>25%</option>
              <option value={1.75}>75%</option>
            </select>
          </div>

        </form>

        {/* -----------HÄR BÖRJAR FAKTURAN   */}
        <div ref={printRef} class="container faktura">
          <div class="invoice-body">

            <div class="row">
              <div class="col-xs-4 text-left">
                <h3>Faktura <small>Med Kredit</small></h3>
                <h5 class="text-muted">Fakturanummer:<input type="text" id="nameInv" name="fakturaNummer"></input> | DATUM: {getCurrentDate()}</h5>
              </div>
              <div class="col-xs-4 text-right">
              </div>
              <div class="col-xs-4 text-right">
                <img
                  src={stefanImage}
                  alt="Stefan GIF"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #4040FF' }}
                />
                <ul class="media-body list-unstyled">
                  <li><strong>Martin företag AB</strong></li>
                </ul>
              </div>
            </div>

            <div class="row" >
              {/**** */}
              <div className="col-xs-5">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Företag detaljer</h3>
                  </div>
                  <div className="panel-body">
                    <dl className="dl-horizontal">
                      <dt>Kontakt:</dt>
                      <dd ><strong>Martin faktura AB</strong></dd>
                      <dt>Telefon:</dt>
                      <dd>070-123123</dd>
                      <dt>Address</dt>
                      <dd> Box 123 123 12 KARLSKRONA</dd>
                      <dt>E-post:</dt>
                      <dd>martinforetagAB@gmail.com</dd>
                      <dt>Webbplats:</dt>
                      <dd className="mono">http://www.martinforetagab.se</dd>



                    </dl>
                  </div>
                </div>
              </div>

              <div class="col-xs-7">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Kund Detaljer</h3>
                  </div>
                  <div class="panel-body">
                    <dl class="dl-horizontal">

                      <dt>Kontakt:</dt>
                      <dd>
                        <input
                          id="nameInv"
                          value={name}
                          onChange={(e) => setNamn(e.target.value)}
                        />
                      </dd>

                      <dt>Telefon:</dt>
                      <dd>
                        <input
                          id="nameInv"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </dd>

                      <dt>Adress:</dt>
                      <dd>
                        <input
                          id="nameInv"
                          value={adress}
                          onChange={(e) => setAdress(e.target.value)}
                        />
                      </dd>

                      <dt>E-post:</dt>
                      <dd>
                        <input
                          id="nameInv"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </dd>
                      <dt>Webbplats:</dt>
                      <dd>
                        <input
                          id="nameInv"
                          value={webadress}
                          onChange={(e) => setWebadress(e.target.value)}
                        />
                      </dd>

                      <dt>&nbsp;</dt>
                      <dd>&nbsp;</dd>

                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* <hr style="margin:3px 0 5px" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit repudiandae numquam sit facere blanditiis, quasi distinctio ipsam? Libero odit ex expedita, facere sunt, possimus consectetur dolore, nobis iure amet vero.*/}

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Produkter:</h3>
              </div>

              <table class="table table-condensed table-bordered">
                <thead>
                  <tr>
                    <th class="text-center ">Produktnamn:</th>
                    <th class="text-center ">Antal:</th>
                    <th class="text-center ">Pris:</th>
                    <th class="text-center ">Summa:</th>
                    <th class="text-center ">Moms:</th>
                    <th class="text-center  small-column "></th>
                  </tr>
                </thead>
                <tbody>

                  {productList.map((item) => (
                    <tr key={item.id}>
                      <td class="text-center">
                        <span class="mono">{item.productname}</span>
                      </td>

                      <td class="text-center">
                        <span class="mono">{item.antal}</span>
                      </td>

                      <td class="text-center">
                        <span class="mono">{item.pris}</span>
                      </td>

                      <td class="text-center">
                        <span class="mono">{(item.antal * item.pris).toFixed(2)}</span>
                      </td>

                      <td class="text-center">
                        <strong class="mono">{item.moms + '%'}</strong>
                      </td>

                      <td class="text-center" >
                        <button class="mono" className="product-btn" onClick={() => handleDeleteProduct(item.id)}></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="panel panel-default">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <td class="text-right "></td>
                    <td class="text-right "></td>
                    <td class="text-right "></td>
                    <td class="text-right ">Tot utan Moms:</td>
                    <td class="text-right "></td>
                    <td class="text-right ">Tot med Moms:</td>
                  </tr>
                  <tr>
                    <td class="text-right "></td>
                    <td class="text-right "></td>
                    <td class="text-right "></td>
                    <td class="text-right">{totalSumUtanMoms.toFixed(2) + ' KR'}</td>
                    <td class="text-right  "></td>
                    <td class="text-right">{totalTOT.toFixed(2) + ' KR'}</td>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="row">
              <div class="col-xs-7">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <i>Kommentar / Notering <br></br>
                      -hej detta är Martins faktura för info. </i>
                  </div>
                </div>
              </div>
              <div class="col-xs-5">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Betalningsmetod</h3>
                  </div>
                  <div class="panel-body">
                    <p>För din bekvämlighet kan du sätta in det slutliga beloppet på någon av våra banker</p>
                    <ul class="list-unstyled">
                      <li>Nordea Bank - <span class="mono">MO123456789456123</span></li>
                      <li>SEB Bank - <span class="mono">MO123456789456123</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="invoice-footer">
            Tack för att du använder vår service!.
            Hoppas att vi ses snart igen Martin AB
            <strong>~Godkänd för F-skatt!~</strong>
          </div>
        </div>
      </div>    {/*HÄR SLUTAR PRINT FAKTURA*/}
    </div>
  );
}


export default InvoiceForm;
