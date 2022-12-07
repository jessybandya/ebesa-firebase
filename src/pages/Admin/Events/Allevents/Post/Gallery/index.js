import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../firebase';
import Post from './Post';

function ImagesList({eventId}) {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");

   useEffect(() => {
       db.collection('events').where("eventId","==",eventId).onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);

  return (
    <div>
    {
      posts.map(({id, post}) => (
         <Post
         key={id} 
         albumID={id}
         albumName={post?.name}
         images={post?.images}
         />
       ))
}
    </div>
  )
}

export default ImagesList