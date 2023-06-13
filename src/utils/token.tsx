const DecodeToken=()=>{
    const token = localStorage.getItem('token');
    const base64Url = token?.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    if(base64){
        const payload = JSON.parse(atob(base64));
        return payload;
    }
    return;
}

export default DecodeToken;