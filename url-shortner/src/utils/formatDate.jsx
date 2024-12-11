export const formatDate=(dateToFormat)=>{


const date = new Date(dateToFormat);
const formatedDate=date.toLocaleString('en-US', { timeZone: 'UTC' })
return formatedDate;


}
