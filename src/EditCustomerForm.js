import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './EditCustomerForm.css'


function EditCustomerForm() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [webadress, setWebadress] = useState('');

  useEffect(() => {
     fetchCustomers();
  }, ); /// denna uppdaterar listan varje gång :-) !!!!!


  const fetchCustomers= async () => {
    try {
      const response = await axios.get('/api/customers');
      // const response = await axios.get('http://localhost:5000/api/customers'); // STAR!
     

      console.log('-------------------------response from fetchCustomers: =   ' + response)
      setCustomers(response.data);
      console.log('--DATA---------------------response.data from fetchCustomers: =   ' + response.data)
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

//props.MyFuction = fetchCustomers();

  const handleUpdateCustomer = async () => {
    try {

      // Manual validation
    if (!name) {
      alert('Fyll i namn');
      return;
    }
    if ( !phone ) {
      alert('Fyll i telefonNr');
      return;
    }
    if ( !adress ) {
      alert('Fyll i adress');
      return;
    }
    if ( !email ) {
      alert('Fyll i email');
      return;
    }
    if ( !webadress) {
      alert('Fyll i webadress');
      return;
    }


      const updatedCustomer = {
        name,
        phone,
        adress,
        email,
        webadress,
       
      };

      await axios.put(`/api/customers/${selectedCustomer}`, updatedCustomer);
      
      alert('Customer updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer.');
    }
  };

  const handleSelectCustomer = (customerId) => {
    const selected = customers.find((customer) => customer._id === customerId);
    if (selected) {
      setSelectedCustomer(selected._id);
      setName(selected.name);
      setPhone(selected.phone);
      setAdress(selected.adress);
      setEmail(selected.email);
      setWebadress(selected.webadress);
      
    }
  };

  return (
    <div>
      <h2>Ändra Kund</h2>

      <div>
        <label>Välj:</label>
        
        <select value={selectedCustomer} onChange={(e) => handleSelectCustomer(e.target.value)}>
          <option value="">Kund</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <br></br>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Kundnamn"
        required
      />
       <input
     
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefonnummer"
        required
      />
      <input
        type="text"
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
        placeholder="Adress"
        required
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-post"
        required
      />
       <input
        type="text"
        value={webadress}
        onChange={(e) => setWebadress(e.target.value)}
        placeholder="Webbadress"
        required
      />

      <button onClick={handleUpdateCustomer}>Uppdatera Kund</button>

    </div>
  );
}

export default EditCustomerForm;
