import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';

import imgaes from '~/asset/images';
import sytles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = imgaes.noImage, ...props }, ref) => {
  const [fallBack, setFallBack] = useState('');
  const handelFallBack = () => {
    return setFallBack(customFallBack);
  };
  return (
    <img
      className={classNames(sytles.wrapper, className)}
      ref={ref}
      src={fallBack || src}
      alt={alt}
      {...props}
      onError={handelFallBack}
    />
  );
});
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallBack: PropTypes.string,
};
export default Image;
