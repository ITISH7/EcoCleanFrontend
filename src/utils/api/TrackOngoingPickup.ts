import axios from "axios"

export async function getOngoingPickupStatus(){
try{
// return await axios.get("http://localhost:8080/status",{
// headers: {
// Authorization: `Bearer ${token}`,
// },
// });
// uncomment when api is ready 
const data=3;
return data;
}
catch(error){
if(axios.isAxiosError(error)){
throw new Error (error.message)}
else{
throw new Error ("Some Unknown Error occured")}
}
}
