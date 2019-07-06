import React from 'react';

export default function Row(props) {
  let style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  );
}