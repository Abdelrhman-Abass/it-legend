"use client";

import Image from "next/image";

const SearchPopup = ({ isSearchOpen, setIsSearchOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`edu-search-popup ${isSearchOpen ? "open" : undefined}`}>
      <div className="content-wrap">
        <div className="site-logo">
          <Image
            className="logo-light"
            src="/assets/main-logo.png"
            alt="logo"
            width={170}
            height={30}
          />
          <Image
            className="logo-dark"
            src="/assets/white-logo.png"
            alt="logo"
            width={170}
            height={30}
          />
        </div>
        <div className="close-button" onClick={() => setIsSearchOpen(false)}>
          <button className="close-trigger">
            <i className="icon-73"></i>
          </button>
        </div>
        <div className="inner">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="edublink-search-popup-field"
              placeholder="search..."
            />
            <button className="submit-button">
              <i className="icon-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
