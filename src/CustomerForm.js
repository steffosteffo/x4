import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    adress: '',
    email: '',
    webadress: ''
  });

  
  
  useEffect(() => {
    //fetchCustomers();
  }, );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // tar bort html 
    try {
      // Send POST request to API to add new customer using the `customer` state
     // const response = await axios.post('/api/customers', customer);
      const response = await axios.post('http://steffohost.hopto.org:5000/api/customers', customer); //star
      

      console.log('Response:', response.data); // Assuming the server responds with the saved customer
      setCustomer({ name: '', phone: '', adress: '', email: '', webadress: '' }); // Clear the form after successful submission
      alert('PCustomer submitted successfully!');
      /// props.fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div>
      <h2>Registrera Kund</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleInputChange}
          placeholder="Skriv Kundnamn"
          required
        />
        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleInputChange}
          placeholder="Skriv in Telefonnummer"
          required
        />
        <input
          type="text"
          name="adress"
          value={customer.adress}
          onChange={handleInputChange}
          placeholder="Skriv Adress"
          required
        />
        <input
          type="text"
          name="email"
          value={customer.email}
          onChange={handleInputChange}
          placeholder="Skriv in E-mejl"
          required
        />
          <input
          type="text"
          name="webadress"
          value={customer.webadress}
          onChange={handleInputChange}
          placeholder="Skriv in Webb adress"
          required
        />

        <button type="submit">Lägg till Kund</button>
      </form>
    
    </div>
  );
}

export default CustomerForm;
