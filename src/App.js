import React from 'react';
import Slider from "react-slick";
import Clock from './Clock';
import Item from './Item';
import logo from './logo.svg';
import './App.css';
import './carousel.css';
import {data1, data2, data3} from './raffleData';

const data = data1;
// const data = data2;
// const data = data3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      board: ["logo","logo","logo","logo","logo","logo", "logo"],
      initialBoard: ["logo","logo","logo","logo","logo","logo", "logo"],
      isCounting: false,
      count: 60,
      play: false,
      autoplay: false,
      shuffled: false,
      pauseOnHover:true,
    }
    this.onStart = this.onStart.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  audio = new Audio('/timer.mp3')

  togglePlay = (str) => {
    if (str == "on") {
      this.setState({ play: true }, () => {
        this.audio.play();
      });
    } else {
        if (this.state.play !== false) {
          this.setState({ play: false }, () => {
            this.audio.pause();
          });
      }
    }
  }

  mergeTickets() {
    let arr = [];
    data.map(p => arr.push((p.name + " ").repeat(p.total).split(" ")));
    this.setState({
      entries: arr.flat().filter(str => str.length > 0),
    });
    data.push("".repeat(5).split(" "))
  }

  componentDidMount() {
    this.mergeTickets()
  }

  shuffleAll(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    this.setState({
      board: array.slice(0, 700),
      autoplay: true,
    }, ()=> this.startCarousel())
    return array;
  }

  startCarousel() {
    this.slider.slickPlay();
  }

  onStart() {
    this.shuffleAll(this.state.entries);
    this.togglePlay("on");
    this.clockTimer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
        {
          count: newCount >= 0 ? newCount : 0,
          isCounting: true,
        }
      );
    }, 1000);
  }

  render() {
    if(this.state.count === 0) {
      this.slider.slickPause();
      this.togglePlay("off")
    }
    const settings = {
      dots: true,
      infinite: true,
      speed: 400,
      autoplaySpeed: 1,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: this.state.autoplay,
      dots: false,
      arrows: false,
      centerMode: true,
      cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    };
    return (<div className="App">
              <div>
                <Clock time={this.state.count}/>
                <button onClick={this.onStart}>Start</button>
              </div>

              <div id="carousel" className={this.state.count === 0 ? "winner-selected" : ""}>
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                      {
                        this.state.board.map((item, i) => {
                          return <Item key={i} id={this.state.board[i]} level={i} />})
                      }
                    </Slider>
                  <div>
                    <img style={{width: 120}} src={'./rising.svg'}/>
                  </div>
                  {this.state.count === 0
                    ? <h1 className="winner-winner">Winner!</h1>
                    : null
                  }
              </div>
            </div>
          )
  }
}

export default App;
