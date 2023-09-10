import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import sytles from './Button.module.scss';

const cx = classNames.bind(sytles);
function Button({
  to,
  primary = false,
  outline = false,
  small = false,
  large = false,
  disable = false,
  nonBG = false,
  hasIcon = false,
  border = false,
  onlyIcon = false,
  long = false,
  href,
  onClick,
  leftICon,
  children,
  className,
  rightBtn,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  const classes = cx(
    'wrapper',
    {
      primary,
      outline,
      small,
      large,
      disable,
      hasIcon,
      nonBG,
      border,
      onlyIcon,
      long,
    },
    className,
  );
  return (
    <Comp className={classes} {...props}>
      {leftICon}
      {children}
      {rightBtn}
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  disable: PropTypes.bool,
  nonBG: PropTypes.bool,
  hasIcon: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  leftICon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
export default Button;
