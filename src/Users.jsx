import { Divider, Typography  } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import { useMediaQuery,useTheme } from '@material-ui/core';
import firebase from './firebase';


export default function Users() {
  
    
    const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getDataFromFirebase = [];
    const subscriber = firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getDataFromFirebase.push( doc.data());
      });
      setPosts(getDataFromFirebase);
    });
    return () => subscriber();
  }, [])

    return (
        <div style={{marginBottom:'14em',marginTop:'2em'}}>
            <Typography style={{textAlign:'center',color:'#FFB22B'}} variant='h3'>
                Users 
            </Typography>
            <Divider/>
            <div>
           
            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NO.</th>
              <th scope="col">BALANCE(₹)</th>
            </tr>
          </thead>
          <tbody>
          {posts.map((data) => (
            <tr>
              <td data-column="NAME">{data.name}</td>
              <td data-column="Email">{data.email}</td>
              <td data-column="Phone No">{data.phone}</td>
              <td data-column="BALANCE(₹)">{data.amount}₹</td>
            </tr>
            ))}
          </tbody>
        </table>
        
        </div>
      </div>
    )
}