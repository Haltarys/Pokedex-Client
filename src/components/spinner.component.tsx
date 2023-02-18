import React from 'react';
import { useTranslation } from 'react-i18next';

import '../styles/spinner.scss';

type IProps = {
  current?: number;
  total?: number;
} & typeof defaultProps;

const defaultProps = {
  current: 0,
  total: 0,
};

function Spinner(props: IProps) {
  const { current, total } = props;
  const { t } = useTranslation();

  return (
    <div className="spinner">
      <div className="ball" />
      <div className="spinner-text">
        {t('spinner.loading')}
        {current && total ? `${current}/${total}` : null}
      </div>
    </div>
  );
}

Spinner.defaultProps = defaultProps;

export default Spinner;
