//Module
import axios from "axios";


// const baseURL = 'http://localhost:3001/api/notes'
//bec now both front and backend at on same address
 const baseURL = '/api/notes'

 
//  function getAll(){
 
//    const request=  axios.get(baseURL)
//    return request.then(responce=>responce.data)
//     // 1st return method was only returning the promise directly but the taking to request variable first.putting the return again now return the promise directly
//  }
const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}


 function create(newObject){
  const request = axios.post(baseURL, newObject)
   return request.then(responce => responce.data)
 }

 function update(id, newObject){
  const request=  axios.put(`${baseURL}/${id}`, newObject)
   return request.then(responce => responce.data)
 }

// //this module/file is returning object with 3 fields. each filed has 1 function
 export default{
   getAll,
   create,
   update
 }
 
