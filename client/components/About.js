import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const landmark_images = [
  'https://dicasnovayork.com.br/wp-content/uploads/2015/09/Flatiron-Building-1050x700.jpg',
  'https://attractionsofamerica-attractionsofame1.netdna-ssl.com/images/illinois/20170629131550_millenium-park.jpg',
  'https://imgs.6sqft.com/wp-content/uploads/2014/08/21033525/Grand_Central_Terminal_Lobby.jpg',
  'https://static1.squarespace.com/static/52da9677e4b03d314575985a/t/58d4f0dc1b10e32d585d3e9c/1490350310238/NYC+Hotels+Best+Views.jpg?format=1500w',
  'http://www.obj.ca/sites/default/files/styles/article_main/public/2017-12/iStock-495755592.jpg?itok=XOzlUere',
  'https://upload.wikimedia.org/wikipedia/commons/d/d3/Statue_of_Liberty%2C_NY.jpg',
  'https://static01.nyt.com/images/2016/12/14/nyregion/14LANDMARKS2/14LANDMARKS2-facebookJumbo.jpg',
  'https://thumbs-prod.si-cdn.com/zi63jyuo6KIGLAtwh06xU_ldWSQ=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/8c/08/8c087dbd-dfd0-446e-8f30-c964de6e87c9/central-park.jpg',


  'https://www.planetware.com/photos-large/USNY/new-york-city-brooklyn-bridge.jpg',
  'http://cdn.brownstoner.com/wp-content/uploads/2016/01/east-new-york-brooklyn-landmark-preservation-rezoning-3.jpg',
  'https://a1.cdn-hotels.com/gdcs/production58/d1542/4d9c1080-c199-11e7-81c7-0242ac1101c4.jpg',

  'https://s24890.pcdn.co/wp-content/uploads/2017/10/New-York-City-Best-Photo-Locations-7.jpg',
  'http://www.turizmoteka.hr/image/9873/original/',
  'https://cdn.archpaper.com/wp-content/uploads/2017/08/NYPL_Jiahui-Huang_Flickr.jpg',
  'https://thenypost.files.wordpress.com/2018/08/wash-park-arch.jpg?quality=90&strip=all&w=618&h=410&crop=1',
  'https://si.wsj.net/public/resources/images/BN-TJ019_NYTOWN_HD_20170509114050.jpg',
  'http://images.nymag.com/travel/visitorsguide/photoops0712_1b_560.jpg',
  'https://lh3.googleusercontent.com/zg7CqQ4bzYUMQvFIkHLPJVLCg0zG6S68O89ca38tnTNx6Px67zgxjlCFriWbUsSW4RByNeSnDuZ7XN-GkqhLugUIE3hSfJeofO6nB4prpr1ljufe3lAcNrjkB3jH02MEn_Ir0zVd'
]

class About extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="about-top">
          <div className="about-title">WhatsThat is ...</div>
          <div className="about-ex">find About Landmarks</div>
          <div className="about-ex2">find About Things</div>
          <div className="about-ex3">find Your Location</div>
          <div className="about-ex4">find Places Around You</div>
          <div className="about-ex5">find People Around You</div>
        </div>
        <hr />
        <div className="landmark-wrapper">
          {/* <div>Hello World </div> */}
          {/* <img src={landmark_images[1]} width="50" height="50" /> */}
          {landmark_images.map((img, idx) => (
            <div key={idx} className="eachDiv"><img src={img} className="eachImg" /></div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(About)
