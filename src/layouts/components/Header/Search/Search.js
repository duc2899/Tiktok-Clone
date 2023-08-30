import { useEffect, useState, useRef } from 'react';

import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as searchServices from '~/component/Services/searchService';
import classNames from 'classnames/bind';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as WrapperPopper } from '~/layouts/Popper';
import AccountItem from '~/component/AccountItem/AccountItem';
import sytles from './Search.module.scss';
import { useDebounced } from '~/hook';

const cx = classNames.bind(sytles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debounced = useDebounced(searchValue, 600);
  useEffect(() => {
    if (!debounced.trim()) {
      setShowResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);
  const handelOnchagnInput = (e) => {
    if (e.target.value.startsWith(' ')) {
      return;
    }
    setSearchValue(e.target.value);
  };
  const handelClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handelHideResult = () => {
    setShowResult(false);
  };
  const callbackFunction = (childrenData) => {
    if (!childrenData) {
      setShowResult(false);
      setSearchValue('');
    }
  };
  return (
    // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={searchResult.length > 0 && showResult}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <WrapperPopper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} props={callbackFunction} />
              ))}
            </WrapperPopper>
          </div>
        )}
        onClickOutside={handelHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search"
            spellCheck={false}
            onChange={(e) => handelOnchagnInput(e)}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handelClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} spin={true} />}

          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
