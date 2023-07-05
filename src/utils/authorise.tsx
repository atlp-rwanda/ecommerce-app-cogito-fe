import DecodeToken from "./token";

export default function checkLoggedIn(){
    if(!localStorage.getItem('token')){
        return false;
    }
    const userDetails = DecodeToken();
    if(!userDetails){
        return false;
    }
    const currentUnixTime = Math.floor(Date.now() / 1000);
    if(userDetails.exp<=currentUnixTime){
        return false;
    }
    return true;
}