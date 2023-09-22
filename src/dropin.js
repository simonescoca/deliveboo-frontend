
import axios from 'axios';

export function initializeDropin(clientToken) {
    
    const button = document.querySelector('#submit-button');
    let instance;
  
    braintree.dropin.create({
      authorization: clientToken,
      paymentOption: {
        enabled: true,
        card: {}
      },
      container: '#dropin-container'
    }, function (createErr, dropinInstance) {
      if (createErr) {
        console.error('Errore durante la creazione di dropin:', createErr);
        return;
      }
  
      instance = dropinInstance;
  
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
          if (requestPaymentMethodErr) {
            console.error('Errore durante la richiesta del metodo di pagamento:', requestPaymentMethodErr);
            return;
          }
          
          const paymentMethodNonce = payload.nonce;

          function SendNonceToServer(paymentMethodNonce) {
            // Esegui una richiesta HTTP al tuo server backend per inviare il nonce
            // e completare la transazione
            axios.post('http://127.0.0.1:8000/api/sendNonce', {
              nonce: paymentMethodNonce
              // Altri dati necessari per il pagamento, se del caso
            })
            .then(response => {
              // Gestisci la risposta dal server backend (es. conferma di pagamento)
              console.log('Risposta dal server:', response.data);
            })
            .catch(error => {
              console.error('Errore durante la richiesta al server backend:', error);
            });
          }
        
          
          SendNonceToServer(paymentMethodNonce);
        });
      });
    });
  
    return instance;
  }

  
