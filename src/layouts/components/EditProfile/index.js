import classNames from 'classnames/bind';
import sytle from './EditProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from '~/component/Images/Images';
import Button from '~/component/Button/Button';
import { createPortal } from 'react-dom';
import { useEffect, useState, useContext } from 'react';
import { StatusAcc } from '~/component/StatusAccount';
import * as editProfileService from '~/component/Services/editProfileService';
import Toast from '~/component/Toast';
const cx = classNames.bind(sytle);

function EditProfile({ open, onClose }) {
  const providerLogin = useContext(StatusAcc);
  let data = providerLogin.data;
  useEffect(() => {
    setInputLn(providerLogin.data.last_name);
    setInputFn(providerLogin.data.first_name);
    setInputAddress(providerLogin.data.website_url);
    setBio(providerLogin.data.bio);
  }, [providerLogin.data, open]);

  const [avatar, setAvatar] = useState();
  const [urlAvatar, setUrlAvatar] = useState();
  const [inputLn, setInputLn] = useState('');
  const [inputFn, setInputFn] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [bio, setBio] = useState('');
  const [countLengthBio, setCountLengthBio] = useState(0);
  const [checkLinkURL, setCheckLinkURL] = useState(true);
  const [show, setShow] = useState(false);
  if (show) {
    setTimeout(() => {
      setShow(false);
      window.location.reload();
    }, 3000);
  }
  if (open) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  const handelInputLn = (e) => {
    if (e.target.value.startsWith(' ')) {
      return;
    }
    setInputLn(e.target.value);
  };
  const handelInputFn = (e) => {
    if (e.target.value.startsWith(' ')) {
      return;
    }
    setInputFn(e.target.value);
  };
  const handelInputAddress = (e) => {
    if (e.target.value.startsWith(' ')) {
      return;
    }
    setInputAddress(e.target.value);
  };
  const handelInputBio = (e) => {
    if (e.target.value.startsWith(' ') || e.target.value.length > 80) {
      return;
    }
    setBio(e.target.value);
    setCountLengthBio(e.target.value.length);
  };
  const checkUrlWebSite = (dataInput) => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    if (regex.test(dataInput) === true || dataInput === '') {
      setCheckLinkURL(true);
    } else {
      setCheckLinkURL(false);
    }
    return regex.test(dataInput);
  };

  const handelChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setUrlAvatar(e.target.files[0]);
    setAvatar(file);
  };
  const checkAllValidation = () => {
    if (
      inputLn !== data.last_name ||
      inputFn !== data.first_name ||
      inputAddress !== data.website_url ||
      bio !== data.bio ||
      avatar !== undefined
    ) {
      if (countLengthBio < 80 && checkLinkURL === true) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  const handelSubmit = (e) => {
    let formdata = new FormData(this);
    e.preventDefault();
    if (checkAllValidation()) {
      if (inputLn !== data.last_name) {
        formdata.append('last_name', inputLn);
      }
      if (inputFn !== data.first_name) {
        formdata.append('first_name', inputFn);
      }
      if (urlAvatar !== undefined) {
        formdata.append('avatar', urlAvatar, urlAvatar.preview);
      }
      if (bio !== data.bio) {
        formdata.append('bio', bio);
      }
      if (inputAddress !== data.website_url) {
        formdata.append('website_url', inputAddress);
      }

      const fetchApi = async () => {
        try {
          await editProfileService.edditProfile(JSON.parse(localStorage.getItem('token')), formdata);
          setShow(true);
        } catch (err) {
          console.log(err);
        }
      };
      fetchApi();
    }
  };
  const toastView = () =>
    createPortal(
      <Toast text="Successfully changed information" visible={show}></Toast>,
      document.getElementById('protal'),
    );
  if (!open) return null;
  return createPortal(
    <div className={cx('bg-block', 'active-modal')}>
      <form className={cx('wrapper')} onSubmit={handelSubmit}>
        <div className={cx('header')}>
          <p className={cx('title')}>Edit Profile</p>
          <FontAwesomeIcon icon={faXmark} onClick={onClose} />
        </div>
        <section className={cx('body')}>
          <div className={cx('block-1', 'block')}>
            <p className={cx('title')}>Profile picture</p>
            <div className={cx('container-avatar')}>
              <label htmlFor="avatar">
                {avatar ? <img src={avatar.preview} alt=""></img> : <Image src={data.avatar}></Image>}
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                <input type="file" aria-label="hello" id="avatar" onChange={handelChangeAvatar}></input>
              </label>
            </div>
          </div>
          <div className={cx('block-2', 'block')}>
            <p className={cx('title')}>Lastname</p>
            <div className={cx('container')}>
              <input value={inputLn} type="text" placeholder="Last name" onChange={(e) => handelInputLn(e)} />
              <p>Enter your last name</p>
            </div>
          </div>
          <div className={cx('block-3', 'block')}>
            <p className={cx('title')}>Firstname</p>
            <div className={cx('container')}>
              <input value={inputFn} type="text" placeholder="First name" onChange={(e) => handelInputFn(e)} />
              <p>Enter your first name</p>
            </div>
          </div>
          <div className={cx('block-4', 'block')}>
            <p className={cx('title')}>Website</p>
            <div className={cx('container')}>
              <input
                className={cx(`${checkLinkURL === false && 'error-url'}`)}
                value={inputAddress}
                type="text"
                placeholder="Address Website"
                onChange={(e) => handelInputAddress(e)}
                onBlur={(e) => checkUrlWebSite(e.target.value)}
              />
              {checkLinkURL === false ? (
                <p className={cx('error-url-text')}>Invalid website address</p>
              ) : (
                <p>Enter your link website addresss</p>
              )}
            </div>
          </div>
          <div className={cx('block-5')}>
            <p className={cx('title')}>Bio</p>
            <div className={cx('container')}>
              <textarea
                rows={4}
                spellCheck="false"
                placeholder="Bio"
                value={bio}
                className={cx('input-bio')}
                onChange={(e) => handelInputBio(e)}
              />
              <p className={cx(`${countLengthBio === 80 && 'error-count'}`)}>{countLengthBio}/80</p>
            </div>
          </div>
        </section>
        <footer className={cx('footer')}>
          <div>
            <Button border small onClick={onClose}>
              Cancel
            </Button>
            <Button primary small className={cx(`${checkAllValidation() === false && 'disable'}`)}>
              Save
            </Button>
          </div>
        </footer>
      </form>
      {toastView()}
    </div>,
    document.getElementById('protal'),
  );
}

export default EditProfile;
