import React from 'react';
import PropTypes from 'prop-types'

import OptionItem from './option';

function book (props) {
  const {imageLinks, title, authors, shelf} = props.info;
  const shelfValue = (shelf) ? shelf : 'none';
  let image = '';
  if (props && imageLinks) {
    image = `url(${imageLinks.smallThumbnail})`;
  }
  
  const options = [
    {
      text: 'Move to...',
      value: 'none',
      disabled: true,
    },
    {
      text: 'Currently Reading',
        value: 'currentlyReading',
      disabled: false,
    },
    {
      text: 'Want to Read',
      value: 'wantToRead',
      disabled: false,
    },
    {
      text: 'Read',
      value: 'read',
      disabled: false,
    },
    {
      text: 'None',
      value: 'none',
      disabled: false,
    },
  ]
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{backgroundImage: image}}
          />
          <div className="book-shelf-changer">
            <select onChange={props.onChange} value={shelfValue}>
              {options.map(option => (
                <OptionItem
                  text={option.text}
                  value={option.value}
                  disabled={option.disabled}
                  key={option.text}
                />
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{(authors && authors.length) ?authors.join(', ') : ''}</div>
      </div>
    </li>
  )
}
book.propTypes = {
  info: PropTypes.shape(),
  onChange: PropTypes.func,
}

export  default book;
