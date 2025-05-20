import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageGallery from './components/ImageGallery';
import Carousel3D from './components/Carousel3D';


function App() {
  const images = [
    { url: 'https://picsum.photos/300/200?random=1', price: "￥124", title: "1" },
    { url: 'https://picsum.photos/300/200?random=2', price: "￥124", title: "1" },
    { url: 'https://picsum.photos/300/200?random=3', price: "￥124", title: "1" },
    { url: 'https://picsum.photos/300/200?random=4', price: "￥124", title: "1" },
    { url: 'https://picsum.photos/300/200?random=5', price: "￥124", title: "1" },
    { url: 'https://picsum.photos/300/200?random=6', price: "￥124", title: "1" }
  ];
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

    <div className='header-text'>
  <h1>Make your spend, well-spent
        </h1>
        <h3>Updating your wardrobe? Get cashback. When in Japan? Spend in Yen. Big life goals? Reach them faster. However you spend — Revolut is all you need.
</h3>
</div>
      
        
        <button>Get started</button>
        {/* <ImageGallery></ImageGallery> */}
        <Carousel3D
          images={images}
          autoPlay={true}
          interval={25000}
        />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
