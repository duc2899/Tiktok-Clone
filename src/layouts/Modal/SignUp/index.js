import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import { faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createPortal } from 'react-dom';

import sytle from '../Modal.module.scss';
import Button from '~/component/Button/Button';
import * as authService from '~/component/Services/authService';

import LoadingOverlay from '~/layouts/Loading';
import Toast from '~/component/Toast';
const cx = classNames.bind(sytle);

function SignUp() {
  const schema = yup
    .object({
      email: yup.string().required('Email is requierd').email('Email must be a valid email'),
      password: yup.string().required().min(8).max(20),
    })
    .required();

  const inputPassRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showAssertive, setShowAssertive] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState(false);
  const [show, setShow] = useState(false);
  if (show) {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const checkPassWord = () => {
    if ((inputPassword.length >= 8 && inputPassword.length <= 20) === true) {
      const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!regularExpression.test(inputPassword)) {
        return false;
      } else {
        return true;
      }
    }
  };
  const checkAll = () => {
    if (!!errors.email?.message === false && !!errors.password?.message === false && checkPassWord() && checked) {
      return true;
    }
  };

  const onSubmitTest = (data) => {
    if (checkAll()) {
      setLoading(true);
      data.type = 'email';
      const fetchApi = async () => {
        const result = await authService.auth(data);
        setLoading(false);
        if (result === undefined) {
          setCatchError(true);
        } else {
          setShow(true);
        }
      };
      setTimeout(fetchApi, 5000);
    }
  };
  const toastView = () =>
    createPortal(<Toast text="Sign up successfully" visible={show}></Toast>, document.getElementById('protal'));
  const loadingView = () =>
    createPortal(loading && <LoadingOverlay title="Creating"></LoadingOverlay>, document.getElementById('protal'));
  return (
    <div className={cx('block')}>
      {toastView()}
      <form onSubmit={handleSubmit(onSubmitTest)}>
        <div className={cx('block-header')}>
          <span>Email</span>
          <span>Sign up with email</span>
        </div>

        <div className={cx('block-input')}>
          <div className={cx('input-email', `${(!!errors.email?.message || catchError) && 'error'}`)}>
            <input
              value={inputEmail}
              placeholder="Email address"
              {...register('email', {
                required: true,
              })}
              onFocus={() => setCatchError(false)}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <p>{errors.email?.message}</p>
            <p>{catchError && 'Email already exists'}</p>
          </div>

          <div
            className={cx(
              'input-pass',
              `${inputPassword === '' && 'nomarl'}`,
              `${!!errors.password?.message && 'error-1'}`,
              `${inputPassword.length >= 8 && inputPassword.length <= 20 ? 'success-1' : ''}`,
              `${checkPassWord() === true ? 'success-2' : ''}`,
              `${checkPassWord() === false ? 'error-2' : ''}`,
            )}
          >
            <input
              value={inputPassword}
              ref={inputPassRef}
              placeholder="Password"
              type={showPass ? 'text' : 'password'}
              {...register('password')}
              onFocus={() => setShowAssertive(true)}
              onChange={(e) => setInputPassword(e.target.value)}
            />

            <FontAwesomeIcon
              className={cx('icon-eye')}
              icon={showPass ? faEye : faEyeSlash}
              onClick={() => setShowPass(!showPass)}
            />
            {(inputPassword !== '' || showAssertive) && (
              <div className={cx('assertive')}>
                <p>Your password must have:</p>
                <div className={cx('assertive-1')}>
                  <FontAwesomeIcon icon={faCheck} />8 to 20 characters
                </div>
                <div className={cx('assertive-2')}>
                  <FontAwesomeIcon icon={faCheck} />
                  Letters, numbers, and special characters
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={cx('block-tick')}>
          <div className={cx('wraper-checkbox')}>
            <input type="checkbox" id="email-consent" onChange={() => setChecked(!checked)} checked={checked} />
            <label htmlFor="email-consent">
              <i className="checkbox-icon">
                <FontAwesomeIcon icon={faCheck} className={cx(checked && 'checked')} />
              </i>
            </label>
          </div>
          <label className={cx('content-label')} htmlFor="email-consent">
            Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
          </label>
        </div>
        <Button primary className={cx('btn-submit', `${!checkAll() && 'disable'}`)}>
          Next
        </Button>
      </form>
      {loadingView()}
    </div>
  );
}

export default SignUp;
