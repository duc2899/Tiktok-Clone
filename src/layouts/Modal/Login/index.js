import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useContext, useEffect } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createPortal } from 'react-dom';

import sytle from '../Modal.module.scss';
import Button from '~/component/Button/Button';
import * as getTokenService from '~/component/Services/getTokenService';

import LoadingOverlay from '~/layouts/Loading';
import Toast from '~/component/Toast';
import { StatusAcc } from '~/component/StatusAccount';
import { Modal } from '~/layouts';

const cx = classNames.bind(sytle);

function Login() {
  const schema = yup
    .object({
      email: yup.string().required('Email is requierd').email('Email must be a valid email'),
      password: yup.string().required('Password is requierd'),
    })
    .required();

  const inputPassRef = useRef(null);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catchError, setCatchError] = useState(false);
  const [show, setShow] = useState(false);
  if (show) {
    setTimeout(() => {
      setShow(false);
      window.location.reload();
    }, 3000);
  }

  const changeStatusLogin = useContext(StatusAcc);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const checkAll = () => {
    if (
      !!errors.email?.message === false &&
      !!errors.password?.message === false &&
      inputPassword.length > 0 &&
      inputEmail.length > 0
    ) {
      return true;
    }
  };

  const onSubmitTest = (data) => {
    if (checkAll()) {
      setLoading(true);

      const fetchApi = async () => {
        const result = await getTokenService.getToken(data);
        setLoading(false);

        if (result === undefined) {
          setCatchError(true);
        } else {
          setShow(true);
          localStorage.setItem('token', JSON.stringify(result.meta.token));
          setTimeout(() => {
            changeStatusLogin.setIsLogin(true);
          }, 1000);
          window.location.href = window.location.origin;
        }
      };
      fetchApi();
    }
  };

  const toastView = () =>
    createPortal(<Toast text="Sign up successfully" visible={show}></Toast>, document.getElementById('protal'));
  const loadingView = () =>
    createPortal(loading && <LoadingOverlay title="Processing"></LoadingOverlay>, document.getElementById('protal'));
  return (
    <div className={cx('block')}>
      <form onSubmit={handleSubmit(onSubmitTest)}>
        <div className={cx('block-header')}>
          <span>Email</span>
          <span>Login with email</span>
        </div>

        <div className={cx('block-input')}>
          <div className={cx('input-email', `${(!!errors.email?.message || catchError) && 'error'}`)}>
            <input
              value={inputEmail}
              placeholder="Email address"
              {...register('email')}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <p>{errors.email?.message}</p>
            <p>{catchError && 'User does not exist'}</p>
          </div>

          <div
            className={cx(
              'input-pass',
              `${inputPassword === '' && 'nomarl'}`,
              `${!!errors.password?.message && 'error-1'}`,
            )}
          >
            <input
              value={inputPassword}
              ref={inputPassRef}
              placeholder="Password"
              type={showPass ? 'text' : 'password'}
              {...register('password')}
              onChange={(e) => setInputPassword(e.target.value)}
            />

            <FontAwesomeIcon
              className={cx('icon-eye')}
              icon={showPass ? faEye : faEyeSlash}
              onClick={() => setShowPass(!showPass)}
            />
          </div>
        </div>

        <Button primary className={cx('btn-submit', `${!checkAll() && 'disable'}`)}>
          Login
        </Button>
      </form>
      {loadingView()}
      {toastView()}
    </div>
  );
}

export default Login;
