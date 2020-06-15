import jwt from "jwt-simple";
export default class ApiService {
  constructor(domain) {
    this.domain = "http://172.18.0.135:5000";
    this.host_api = "http://172.18.24.113:4002/gateway/routeapinode";

    this.token = "VmriPq93P-jQc=HItb6IpU~go?#UAQ";
    this.secretcode = "123456";
    this.getToken = this.getToken.bind(this);
    this.getSecret = this.getSecret.bind(this);
  }
  getToken() {
    var token = jwt.encode(this.token, this.secretcode);
    return token;
  }
  getSecret() {
    var mis = "mis999*";
    var secret = jwt.encode(this.secretcode, mis);
    return secret;
  }
  
  
  // API 
  searchShipping() {
      // datasend= {
      //     txtsearch:"acer"
      // }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/Online/getData_shipping",
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }




  

    // API 
    searchShippingPrice(datasend) {
  // datasend=  {
  //            "shipping_id":1,
  //            "dateBegin":"2020-05-01",
  //            "dateEnd":"2020-05-31"
  //            }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/Online/getPrice_shipping",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

}
