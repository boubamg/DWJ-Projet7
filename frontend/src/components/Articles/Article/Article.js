import React from 'react'
import './Article.css'


const Article = ({id, profilePicture, name, likes, date, attachment, content}) => {

    return (
       
        <div className="card">
            <div className="side">
                <div className="creator">
                    <img src={profilePicture} alt="profile image"/>
                    <span className="name">{name}</span>
                </div>
                <div className="likes">
                {likes}
                </div>
                <span className="italic">{date}</span>
            </div>
            
            <div className="content">
                <div className="attachment">
                <img src={attachment} alt="image" />
                </div>
                <div className="text">{content}</div>
            </div>
        </div>
    )
}

export default Article