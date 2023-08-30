import PropTypes from 'prop-types';
import Button from '~/component/Button/Button';
import classNames from 'classnames/bind';
import sytles from './Menu.module.scss';

const cx = classNames.bind(sytles);

function MenuItems({ data, onClick }) {
  const classes = cx('mennu-item', {
    cross: data.cross,
  });
  return (
    <Button className={classes} leftICon={data.icon} to={data.to} onClick={onClick}>
      {data.title}
    </Button>
  );
}
MenuItems.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
export default MenuItems;
