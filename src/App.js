import React, { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm';
import CustomerForm from './CustomerForm';
import EditCustomerForm from './EditCustomerForm';
import ProductForm from './ProductForm';
import EditProductForm from './EditProductForm';
import Email from './Email';
import LoginForm from './LoginForm';
import axios from 'axios'; 

function App() {
  const [selectedForm, setSelectedForm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Change to store the complete user object

  useEffect(() => {
    if (isAuthenticated) {
      // Add the beforeunload event listener when the user is authenticated
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        // Perform the PUT request to update antal before the window closes
        if (loggedInUser) {
          axios.put(`http://steffohost.hopto.org:5000/api/anames/${loggedInUser._id}`, {
            steffoname: loggedInUser.steffoname,
            alosen: loggedInUser.alosen,
            antal: 0
          })
          .then(response => {
            console.log('Logout successful:', response.data);
          })
          .catch(error => {
            console.error('Error during logout:', error.response ? error.response.data : error.message);
          });
        }
        event.returnValue = ''; // This line is required for the event to work in some browsers
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up the event listener when the component unmounts or the user logs out
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isAuthenticated, loggedInUser]);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setLoggedInUser(user); // Store the complete user object
  };

  const handleLogout = async () => {
    const user = loggedInUser;
    if (!user) {
      console.error('No user is logged in');
      return;
    }

    console.log('---->>>> handleLogout id= >>>>>>: ' + user._id);

    try {
      console.log('Sending PUT request to: http://steffohost.hopto.org:5000/api/anames/' + user._id);
      console.log('Request payload:', {
        steffoname: user.steffoname,
        alosen: user.alosen,
        antal: 0
      });

      const response = await axios.put(`http://steffohost.hopto.org:5000/api/anames/${user._id}`, {
        steffoname: user.steffoname,
        alosen: user.alosen,
        antal: 0
      });

      console.log('Logout successful:', response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }

    setIsAuthenticated(false);
    setLoggedInUser(null); // Clear the user object
  };

  const handleSelectForm = (formName) => {
    setSelectedForm(formName);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h1>Fakturering</h1>
          <p>Välkommen, {loggedInUser?.steffoname}!</p>
          <button onClick={handleLogout}>Logga ut</button>
          <div>
            <button onClick={() => handleSelectForm('customer')}>Registrera Kund</button>
            <button onClick={() => handleSelectForm('editCustomer')}>Ändra Kund</button>
            <button onClick={() => handleSelectForm('Product')}>Registerera Produkt</button>
            <button onClick={() => handleSelectForm('editProduct')}>Ändra Produkt</button>
            <button onClick={() => handleSelectForm('invoice')}>Fakturera till Kund</button>
          </div>
          {selectedForm === 'Email' && <Email />}
          {selectedForm === 'customer' && <CustomerForm />}
          {selectedForm === 'editCustomer' && <EditCustomerForm />}
          {selectedForm === 'Product' && <ProductForm />}
          {selectedForm === 'editProduct' && <EditProductForm />}
          {selectedForm === 'invoice' && <InvoiceForm />}
        </>
      )}
    </div>
  );
}

export default App;
