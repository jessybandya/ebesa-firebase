import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import Post from './Post';
import { Link } from "react-router-dom";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#43a047",color:'#fff' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#43a047",color:'#fff' }}
      onClick={onClick}
    />
  );
}

const Events = () => {
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    transition: 'fade 2000ms ease-out',
    infinite: true,
    speed: 500,
    autoplay:true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }



  useEffect(() => {
    db.collection('articles').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

  return (
    <div>

 
          <Slider {...settings}>


  {
    posts.map(({id, post}) => (
      <Post
      key={id} 
      articleID={post.articleID}
      description={post.description}
      fileData={post.fileData}
      fileType={post.fileType}
      noLikes={post.noLikes}
      ownerId={post.ownerId}
      timestamp={post.timestamp}
      title={post.title}
      />
     ))
}
</Slider>
    </div>
  )
}

export default Events
