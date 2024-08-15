import React, { useEffect } from 'react';
import { DatePicker as AntdDatePicker } from 'antd-mobile';

const CustomDatePicker = ({ okText = 'OK', cancelText = 'Cancel', visible, ...props }) => {

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const confirmButton = document.querySelector('.adm-picker-header-button');
        if (confirmButton && confirmButton.innerText === '确定') {
          confirmButton.innerText = okText;
        }
      }, 100); // 延时更长的时间，确保DOM已经完全渲染
    }
  }, [visible, okText]);

  return (
    <AntdDatePicker
      {...props}
      visible={visible}
      cancelText={cancelText}
      onConfirm={(date) => {
        if (props.onConfirm) {
          props.onConfirm(date);
        }
      }}
    />
  );
};

export default CustomDatePicker;


