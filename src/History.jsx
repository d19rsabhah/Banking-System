import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import { Typography ,Divider} from "@material-ui/core";




function History() {
  
    
    const [tra, setTransfers] = useState([]);
    useEffect(() => {
        const getDataFromFirebase = [];
        const subscriber = firebase.firestore().collection("users").doc("transaction").collection("lists").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getDataFromFirebase.push({ ...doc.data(), key: doc.id });
            });
            setTransfers(getDataFromFirebase);
        });
        return () => subscriber();
    }, [])
    const sortedUsers= tra.sort((a,b)=>b.amount - a.amount);
    return (
        <div style={{marginBottom:'14em',marginTop:'2em'}}>
            <Typography style={{textAlign:'center',color:'#FFB22B'}} variant='h3'>
            Transaction History
            </Typography>
            <Divider/>
            <div>
            <table class="table table-hover">
  <thead>
    <tr>
                <th scope="col">TIME</th>
                <th scope="col">FROM USER</th>
                <th scope="col">TO USER</th>
                <th scope="col">AMOUNT(₹)</th>
                <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody>
          {sortedUsers.map((data) => (
            <tr key={Math.random().toString(36).substring(2, 9)}>
             <td data-column="TIME">{moment(Number(data.time)).format('h:mm A ll')}</td>
             <td data-column="FROM USER">{data.from}</td>
            <td data-column="TO USER">{data.to}</td>
            <td data-column="AMOUNT(₹)">{data.amount}₹</td>
            <td data-column="STATUS">{data.status}</td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

   
    )
       
}
export default History;
