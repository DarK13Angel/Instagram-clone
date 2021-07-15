import React from 'react';
import './post.css';
import { Avatar } from '@material-ui/core';

function post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                    className="post_avatar"
                    alt='god_of_mischief'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-HC9XWtD19V8sbFKlNIo7_Qcs8M6XpVOdw&usqp=CAU"
                
                />
                <h3>{ username }</h3>   
            </div>
                <img className="post_image" 
                    src={ imageUrl }
                    alt=""

                />
                <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
            
        </div>
    )
}

export default post;
    