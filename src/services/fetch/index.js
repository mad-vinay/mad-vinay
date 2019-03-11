import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';

export const fetchData = ({method, url, data, headers}) => {
    return axios({
        method,
        url,
        data,
        config: {headers}
    })
}