/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './App.css';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from 'axios';
import { useEffect } from 'react';

function App() {



  const init = async () => {
     
  const dashboardID = "759847f3-4564-48f4-8ac6-5488ac87620c";
  const superset_url = 'http://localhost:8088';
  const AdminToken = () => {
    const response= axios.post(`${superset_url}/api/v1/security/login/`, {
      password:"admin",
      username:"admin",
      provider:"db",
      refresh:true
    })

    return response.access_token
  }


  const adminToken = await AdminToken();
  
  const bodyParameters={
    user: {
      username: "myAppUser",
      first_name: "MyApp User",
      last_name: "MyApp User"
    }, resources: [{ type: "dashboard", id:dashboardID  }], rls: [{ clause: "customer_id=4" }]
  }
  

  const config = {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  };


  const fetchGuestTokenFromBackend = async (config) => {
   const response= axios.post(`${superset_url}/api/v1/security/guest_token/`,bodyParameters,config)

   return response.token
  }
    const token =await fetchGuestTokenFromBackend(config);
  
    embedDashboard({
    id: dashboardID,  // given by the Superset embedding UI
    supersetDomain: "https://localhost:8088",
    mountPoint: document.getElementById("container"), // html element in which iframe render
    fetchGuestToken: () => token,
    dashboardUiConfig: { hideTitle: true }
   })
  }
  
  useEffect(() => {
   
   init()
   }, [])
  
  return (
    <div>
  <h1>Superset Embedding</h1>
      <div id="container"></div>
     
    </div>
  );
}

export default App;
