import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './post.js';
import { auth, db } from './firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPost] =  useState([]);
  const [open, setOpen] = useState(false);
  const [openSingIn, setOpenSignIn] = useState(false);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('null');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //logs in 
        console.log(authUser);
        setUser(authUser);
       
      } else {
        //logged out
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })

  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));  

      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      setOpenSignIn(false);

  }


  return (
    <div className="app">
    
      <Modal
        open={open} 
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img 
              className="app_header"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEAKwofJCW5cyiUezM1Z1WwEcMWEVUQqdStoP4ilv83VyCaOtNg4OLE8wuNAsYmd0o7M&usqp=CAU" alt=""
              width='180px' height='60px'
            />
          </center>  
          <Input 
            placeholder="Username"
            typoe="text"
            value={username}
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>sign Up</Button>
        
          </form>
          </div>
      </Modal>
      <Modal
        open={openSingIn} 
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img 
              className="app_header"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEAKwofJCW5cyiUezM1Z1WwEcMWEVUQqdStoP4ilv83VyCaOtNg4OLE8wuNAsYmd0o7M&usqp=CAU" alt=""
              width='180px' height='60px'
            />
          </center>  
        
          <Input 
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>SignIn</Button>
        
          </form>
          </div>
      </Modal>

      <div className="app_header">
        <img
          className="app_headerImage"
          src="data:image/jpeg;base64,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"
          alt=""
          width="45"
          height="45"

        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
          ):(
            <div className="app_loginContainer">
            <Button onClick={() => setOpen(true)}>Signup</Button>

            <Button onClick={() => setOpenSignIn(true)}>Signin</Button>
        </div>
      )}
      </div>

      <div className="app_posts">
            <div className="app_postsLeft">

                {
                  posts.map(({id, post}) => (
                    <Post key={id} postId={post.id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                  ))
                }
            </div>
           

      </div>

      
      
      


      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ):(
        <h3>You have to login first</h3>
      )}


    </div>
  );
}

export default App;
