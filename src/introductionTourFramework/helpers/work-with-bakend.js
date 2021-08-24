import axios from 'axios';

class ApiService {
  constructor({ baseUrl }) {
    this.BASE_URL = baseUrl;
  }

  postElements(newData) {
    // console.log(data1.filter(element => !element['_id']));
    return axios({
      method: 'post',
      url: this.BASE_URL,
      data: {
        data: newData,
      },
    });
  }

  delElement(id) {
    return axios({
      method: 'post',
      url: `${this.BASE_URL}${id}`,
      data: {
        data: id,
      },
    });
  }

  getElements() {
    // console.log('get');
    return axios
      .get(this.BASE_URL)
      .then(r => r)
      .catch(console.log);
  }

  // searchNewElements = data => data.filter(element => !element['_id']);
}

export default ApiService;
// //! Example how to get element
// ctx.apiService.getElements().then(r => {
//   console.log(r.data);
//   ctx.apiService.searchNewElements(r.data);
//   // r.data.data.elements.array.forEach(element => {
//   //   console.log(element);
//   // });
// });
// ! Example how to delete element
// ctx.apiService.delElement('6116addd87426e4ae055c211');
