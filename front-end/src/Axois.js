const axios = require('axios').default;
axios.defaults.baseURL="http://localhost:8080/";
const axoisInstace = {
    axs : axios,
    config : {
        headers : {"Access-Control-Allow-Origin": "*"}
    }
}
export default axoisInstace;