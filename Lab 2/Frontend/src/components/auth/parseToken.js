
export const parseToken = (accessString) =>{
    const base64Url = accessString.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
     return data;
}
      