# Transform module css to atomic class

- Only support transform scss/sass to tailwind class for version 1

## where to use?

- if you have some origin file looks like:

``` jsx
import React, { FC } from 'react';
import cx from 'classnames';
import style from './field.module.scss';

export const FormItem: FC<any> = (props) => {
  const { label, error, children, className: classNames } = props;

  return (
    <div className={ cx(style.custom_block, classNames) }>
      <div className={ style.form_item }>
        <div className={ style.form_label }>
          <p className={ style.form_required }>*</p>
          <p>{ label }</p>
        </div>
        <div>
          { children }
          { error ? <div>{ error }</div> : null }
        </div>
      </div>
    </div>
  );
};

```

- and your css looks like:

``` scss

.custom_block {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  .form_required {
    color: #ff6e70;
  }

  .form_item {
    display: flex;
    align-items: start;
    width: 100%;

    .form_label {
      margin-right: 10px;
      width: 200px;
      height: 32px;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
}
```

- ```cmd + shift + p``` -> type 'transform to atomic class' will get:

``` jsx
import React, { FC } from 'react';
import cx from 'classnames';
import style from './field.module.scss';

export const FormItem: FC<any> = (props) => {
  const { label, error, children, className: classNames } = props;

  return (
    <div className={ cx('w-full flex items-center flex-column justify-undefined', classNames) }>
      <div className={ 'flex items-undefined w-full' }>
        <div className={ 'mr-10 w-200 h-32 flex justify-undefined items-center' }>
          <p className={ 'color-[#ff6e70]' }>*</p>
          <p>{ label }</p>
        </div>
        <div>
          { children }
          { error ? <div>{ error }</div> : null }
        </div>
      </div>
    </div>
  );
};

```

## How to use?

- ```cmd + shift + p``` -> type 'transform to atomic class'

## Issue

- ```@include @media @xxx``` not supported
- ```hover``` not supported
- origin tag selector ```div p h1 ...``` not supported
- Currently, Sass nesting is fully replaced.

## To Do

- support ```unocss atomic class```
- support ```less```
