import React from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import Steps from './Steps';
import Result from './Result';
import { Logo } from './assets/icons';

function App() {
  const step = useSelector((state) => state.dates.step);

  return (
    <div className={styles.app}>
      <div className={styles.app__logo}>
        <Logo />
      </div>
      {(step === 1 || step === 2) &&
        (<Steps />)
      }
      {step === 3 && (
        <Result />
      )}
    </div>
  );
}

export default App;
