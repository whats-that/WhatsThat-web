import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Test extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="test-top">
          <div className="test-ex">
            Test WhatsThat with random images and texts
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex">
            Life’s but a walking shadow, a poor player, that struts and frets
            his hour upon the stage, and then is heard no more; it is a tale
            told by an idiot, full of sound and fury, signifying nothing.
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex">
            Neighbours bring food with death and flowers with sickness and
            little things in between. Boo was our neighbour. He gave us two soap
            dolls, a broken watch and chain, a pair of good luck pennies, and
            our lives.
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex">
            The unexamined life is not worth living. we must reflect upon the
            life we live was partly inspired by the famous phrase inscribed at
            the shrine of the oracle at Delphi, “Know thyself.” The key to
            finding value in the prophecies of the oracle was self-knowledge,
            not a decoder ring. Socrates felt so passionately about the value of
            self-examination that he closely examined not only his own beliefs
            and values but those of others as well. More precisely, through his
            relentless questioning, he forced people to examine their own
            beliefs. He saw the citizens of his beloved Athens sleepwalking
            through life, living only for money, power, and fame, so he became
            famous trying to help them.
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex">
            Full fathom five thy father lies, of his bones are coral made. Those
            are pearls that were his eyes. Nothing of him that doth fade, but
            doth suffer a sea-change into something rich and strange.
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex2">
            Pigs cannot fly. This often sarcastic idiom is commonly used among
            friends in the US to mean that whatever you are discussing will
            never happen. A similar saying was first used in Scotland in the
            late 1500s and a version of which even appeared in Lewis Carroll’s
            1865 novel Alice in Wonderland.
          </div>
        </div>
        <hr />
        <div className="test-top">
          <div className="test-ex3">
            When someone does a runner, he leaves a place in a hurry in order to
            avoid paying for something (like in a restaurant) or flees a
            difficult situation to escape punishment. Like many British idioms,
            this particular idiom originates from one of Shakespeare’s popular
            plays, Anthony and Cleopatra, a gripping story of romance and
            tragedy that was first performed in 1606.
          </div>
        </div>
        <hr />
        <div className="test-wrapper">
          {/* <div className="test-btn">
              <input type="submit" value="Image Generator" />
              <input type="submit" value="Text Generator" />
          </div> */}
          {/* <div>Hello World </div> */}

          {/* {landmark_images.map((img, idx) => (
            <div key={idx} className="eachDiv">
              <img src={img} className="eachImg" />
            </div>
          ))} */}
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({})
const mapDispatch = dispatch => ({})
export default connect(mapState, mapDispatch)(Test)
