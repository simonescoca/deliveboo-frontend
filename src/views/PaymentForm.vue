<template>
  <div id="dropin-container"></div>
  <button id="submit-button">Request payment method</button>
</template>

<script>

import axios from "axios";
import { initializeDropin } from '../../src/dropin.js';
export default {
  
  name: "Payment",
  data() {
    return {
      
      apiUrl: "http://127.0.0.1:8000/api/",
      amount: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      clientToken:"",
      
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/getClientToken')
    .then(response => {
      this.clientToken = response.data.clientToken;
      console.log(this.clientToken);
      const dropinInstance = initializeDropin(this.clientToken);
    });

   
  },
};
  
</script>