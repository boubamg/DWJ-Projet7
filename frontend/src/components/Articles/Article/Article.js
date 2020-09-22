import React from 'react'


const Article = ({profilePicture, name, likes, date, attachment, content}) => {

    return (
        <div className="card">
            <div className="side">
                <div className="creator">
                    <img src={profilePicture} alt="Photo de profil" />
                    <span className="name">{name}</span>
                </div>
                <div className="likes">
                {likes}
                </div>
                <span className="italic">{date}</span>
            </div>
            
            <div className="content">
                <div className="attachment">
                <img src={attachment} alt="Photo d'un post"/>
                </div>
                <div className="text">{content}</div>
            </div>
        </div>
    )
}

export default Article