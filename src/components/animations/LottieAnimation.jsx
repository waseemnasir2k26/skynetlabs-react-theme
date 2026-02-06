import Lottie from 'lottie-react';
import { useAnimation } from '../../context/AnimationContext';

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
}) {
  const { reducedMotion } = useAnimation();

  if (reducedMotion) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
}
