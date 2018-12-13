import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TextWithAppFont from '../../components/TextWithAppFont';
import { gray999 } from '../../colors';

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      timeToAllDivisors: {
        h: 0,
        m: 0,
        s: 0
      },
      isOn: false
    }
  }

  componentDidMount = () => {
    /*
      For some reason the timer stops at 1 second when you destructure "time" off of state
    */
    this.timer = setInterval(() => this.setState({
      isOn: true,
      time: this.state.time + 1,
      timeToAllDivisors: { ...this.secondsToTimeObj(this.state.time + 1) }
    }), 1000);
  }

  secondsToTimeObj = (secs) => {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const timeObj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return timeObj;
  }

  componentWillUnmount = () => {
    const resetTime = {
      h: 0,
      m: 0,
      s: 0
    }
    this.setState({ timeToAllDivisors: { ...resetTime }, isOn: false })
    clearInterval(this.timer)
  }

  // stopTimer = () => {
  //   const resetTime = {
  //     h: 0,
  //     m: 0,
  //     s: 0
  //   }
  //   this.setState({ timeToAllDivisors: { ...resetTime }, isOn: false })
  //   clearInterval(this.timer)
  // }

  render() {
    const { timeToAllDivisors } = this.state;
    const { h, m, s } = timeToAllDivisors;
    const seconds = s < 10 ? `0${s}` : s;
    const minutes = m < 10 ? `0${m}` : m;
    const hours = h < 10 ? `0${h}` : h;
    return (
      <View>
        <TextWithAppFont color={gray999}>{hours}:{minutes}:{seconds}</TextWithAppFont>
      </View>
    )
  }
}