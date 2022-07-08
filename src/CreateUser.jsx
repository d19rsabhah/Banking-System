import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';
import React,{useState} from 'react';
import firebase from "./firebase";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    sendButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:'1rem',
        marginBottom:'3em',
        backgroundColor:theme.palette.common.orange,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
          }
    }
  }));


export default function CreateUser(){

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    



    const [name,setName] = useState('');
    
    const [email,setEmail] = useState('');
    const [emailHelper,setEmailHelper] = useState('');

    const [phone,setPhone] = useState('');
    const [phoneHelper,setPhoneHelper] = useState('');

    const [amount,setAmount] = useState(0)

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setAmount(amount);
      }
      }

    const onChange = event => {
        let valid;

        switch(event.target.id)
        {
            case 'email' :
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);

                if(!valid){
                    setEmailHelper('Invaild email');
                }else
                {
                    setEmailHelper('');
                }
                break;

            case 'phone' :
                setPhone(event.target.value)
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value);

                if(!valid) {
                    setPhoneHelper('Invalid phone')
                }else{
                    setPhoneHelper('')
                }
                break;
                
                default:
                    break;
            }
    }

    const buttonContents = (
        <React.Fragment>
          Submit
        </React.Fragment>
      );

    const Push = (e) => {
        e.preventDefault();
        setLoading(true);

        firebase.firestore().collection("users").add({
            name: name,
            email: email,
            phone: phone,
            amount: amount
        }).then(() => { 
            // alert("Details have been saved")
            setLoading(false);
            setAlert({ open: true, color: "#4BB543" });
            setAlertMesssage("Customer Created Successfully !!");
        }).catch((error) => { 
            // alert(error.message) 
            setLoading(false);
            setAlert({ open: true, color: "#FF3232" });
            setAlertMesssage("Something went wrong! Please try again.");
        });
        setName('');
        setEmail('');
        setPhone('');
        setAmount('');
    }

    return (
        <Grid 
        container 
        direction='column' 
        justifyContent='center'
        style={{
            marginTop:matchesSM ? '4em'  : matchesMD ? '5em' : undefined,
            marginBottom: matchesMD ? '5em' : undefined
        }}
    >
        <Grid item>
            <Grid item container direction='column' style={{alignItems:'center'}}>
                <Grid item>
                    <Typography 
                        variant='h3'
                        align= 'center'
                        style={{lineHeight:1,color:'#FFB22B'}}
                    >
                      <b>  Create New User</b>
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    container
                    direction='column' 
                    style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                >
                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:'whitesmoke'}}><b>Name</b></Typography>
                    <TextField 
                        id="name" 
                        variant="outlined"
                        style={{borderBlockColor:'beige'}}
                        fullWidth
                        // error={senderEmailHelper.length !== 0}
                        // helperText={senderEmailHelper}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:'white'}}><b>Enter your E-mail</b></Typography>
                    <TextField 
                        id="email"
                        variant="outlined"
                        style={{borderBlockColor:'beige'}}
                        fullWidth
                        error={emailHelper.length !== 0}
                        helperText={emailHelper}
                        value={email}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                <Typography style={{color:'whitesmoke'}}><b>Phone No.</b></Typography>
                    <TextField 
                        id="phone" 
                        variant="outlined"
                        style={{borderBlockColor:'beige'}}
                        fullWidth
                        error={phoneHelper.length !== 0}
                        helperText={phoneHelper}
                        value={phone}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:'whitesmoke'}}><b><u>Amount to be deposited</u></b> </Typography>
                    <TextField 
                        id="amount" 
                        variant="outlined"
                        style={{borderBlockColor:'beige'}}
                        fullWidth
                        value={amount}
                        onChange={onAmountChange}
                    />
                </Grid>
                <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                    <Button 
                        disabled={
                            name.length === 0 ||
                            email.length === 0 ||
                            phone.length === 0 ||
                            amount.length === 0 ||
                            emailHelper.length !== 0 ||
                            phoneHelper.length !== 0
                        }
                        variant='contained' 
                        className={classes.sendButton}
                        onClick={Push}
                    >
                      {loading ? <CircularProgress size={30} /> : buttonContents}
                    </Button>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
        <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color
          }
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
      />

    </Grid>
    );
};