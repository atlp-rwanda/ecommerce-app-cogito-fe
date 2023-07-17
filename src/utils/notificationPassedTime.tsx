function extractDateTime(date: string | number | Date) {
    const dateTime = new Date(date).getTime();
    const currentDate = new Date().getTime();
  if(currentDate > dateTime){
        const timeDifference = Math.abs(currentDate - dateTime);
    const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12;
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    if(years){
        const response = `${years}y ago`;
        return response;
    }else if(months){
        const response = `${months}m ago`;
        return response;
        
    }else if(days){
        const response = `${days}d ago`;
        return response;
    }else if(hours){
        const response = `${hours}h ago`;
        return response;
    }else{
        const response = `${minutes}m ago`;
        return response;
    }
    }
       else{
      const error = ' Date Time can not exceed the Current Time ';
      return error;
  }
}
  export default extractDateTime;
  