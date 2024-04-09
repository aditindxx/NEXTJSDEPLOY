import axios from 'axios';

export const postMethodApi = (Url, params) => {
    return axios({
        method: 'POST',
        url: Url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        },
        data: params,
        validateStatus: (status) => {
            return status;
        },
    }).then((response) => {
        return response;
    });
};

export const putMethodApi = (Url, params) => {
  return axios({
      method: 'PUT',
      url: Url,
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
      },
      data: params,
      validateStatus: (status) => {
          return status;
      },
  }).then((response) => {
      return response;
  });
};

export const downloadPostMethodApi = (Url,params) => {
    return axios({
      method: 'POST',
      responseType: 'blob',
      url: Url,
      data: params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        // 'Content-Type': 'application/json',
        // 'Accept': '.xlsx, .xls, .csv',
      },
      validateStatus: (status) => {
        return status;
      },
    }).then((response) => {
      return response;
    });
  };

  
export const downloadGetMethodApi = (Url) => {
    return axios({
      method: 'GET',
      responseType: 'blob',
      url: Url,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        // 'Content-Type': '',
        'Accept': 'application/*',
      },
      validateStatus: (status) => {
        return status;
      },
    }).then((response) => {
      return response;
    });
  };



export const getMethodApi = (Url, params) => {
    return axios({
        method: 'GET',
        url: Url,
        // headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        // },
        data: params,
        validateStatus: (status) => {
            return status;
        },
    }).then((response) => {
        return response;
    });
};

export const deleteMethodApi = (Url, params) => {
    return axios({
        method: 'DELETE',
        url: Url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
        },
        data: params,
        validateStatus: (status) => {
            return status;
        },
    }).then((response) => {
        return response;
    });
};