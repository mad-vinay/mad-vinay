import axios from 'axios';
const url ="";
axios.get(url).then((data) => {
console.log(data);
}).catch((ex) => {
    console.log(ex);
})

export const uploadImage = (data) => { 
return axios({
    method: 'post',
    url,
    data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
}

// axios.get('http://jsonplaceholder.typicode.com/todos', {
//     params: {
//       id: todoId
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//     resultElement.innerHTML = generateSuccessHTMLOutput(response);
//   })
//   .catch(function (error) {
//       resultElement.innerHTML = generateErrorHTMLOutput(error);
//   });