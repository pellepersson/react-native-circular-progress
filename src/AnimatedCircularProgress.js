import React, { PropTypes } from 'react';
import { View, Animated } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start();
  }
  
  performLinearAnimation(toValue, duration, onComplete) {
    Animated.timing(this.state.chartFillAnimation, {
      toValue: toValue,
      duration: duration
    }).start(() => {
      if (!!onComplete && toValue === this.state.chartFillAnimation._value) {
        return onComplete();
      }
    });
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        animationValue={this.state.chartFillAnimation}
        fade={this.props.fade}
      />
    )
  }
}

AnimatedCircularProgress.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number,
  fade: PropTypes.bool,
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10,
  fade: false,
};
