import style from './instagram.scss';
import React, {Component} from 'react';
import {saveAs} from 'file-saver';
import {fabric} from 'fabric';
import Config from '../components/config.js';

class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.instagram.com/p/B3hqYmBlRAZ/?igshid=1xlrqkeb2um1b',
      src: '',
      download: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');
    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45
    });

    this.canvas.add(rect);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    if (this.state.url) {
      this.setState({src: this.state.url.replace(/\?.*/, 'media?size=l').trim()}, () => {
        fabric.Image.fromURL(this.state.src, (oImg) => {
          this.canvas.add(oImg);
        });
      });
    }
  }

  handleImageLoaded(e) {
    console.log(e.target.width, e.target.height);
    this.setState({download: true});
  }

  handleDownload(e) {
    saveAs(this.state.src);
  }

  render () {
    let state = this.state;
    return (
      <div className={style.container}>
        <input type='text' name='url' value={state.url} autoComplete='off' onChange={this.handleChange} />
        <button onClick={this.handleClick} > click </button>
        <div>
            {
              state.src && <img
                src={state.src}
                onLoad={this.handleImageLoaded}
                className={style.preview} />
            }
        </div>
        {state.download && <button onClick={this.handleDownload} > download </button>}
        <div>
          <canvas id='c' />
        </div>
      </div>
    )
  }
}

export default Instagram;
