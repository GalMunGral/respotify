import React from 'react';

export function Column(props) {
  let style = {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: props.justifyContent || 'space-between',
    alignItems: props.alignItems || 'center'
  };
  if (props.style) Object.assign(style, props.style);

  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  );
}

export function Row(props) {
  let style = {
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: props.justifyContent || 'space-between',
    alignItems: props.alignItems || 'center'
  };
  if (props.style) Object.assign(style, props.style);

  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  );
}