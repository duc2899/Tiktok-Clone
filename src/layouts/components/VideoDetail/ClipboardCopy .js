import classNames from 'classnames/bind';
import sytles from './VideoDetail.module.scss';
import { useState } from 'react';
import Toast from '~/component/Toast';

const cx = classNames.bind(sytles);

function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);
  if (isCopied) {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }
  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('block-2')}>
      <p className={cx('link-copy')}>{copyText}</p>
      <button className={cx('button-copy')} onClick={handleCopyClick}>
        Copy link
      </button>
      <Toast visible={isCopied} text="Copied"></Toast>
    </div>
  );
}

export default ClipboardCopy;
