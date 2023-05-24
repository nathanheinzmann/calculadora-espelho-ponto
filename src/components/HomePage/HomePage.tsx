
import { useEffect, useState } from 'react';
import * as Styles from '@/components/HomePage/HomePage.styles';
import Head from 'next/head';
import moment from 'moment';
import { Time } from './HomePage.types';
import { findFirstHour, findSecondHour, findThirdHour, findLastHour } from '@/utils';

const HomePage = () => {
  const [time, setTime] = useState<Time>({
    first: '',
    second: '',
    third: '',
    fourth: '',
    needed: '08:00',
  });
  const [result, setResult] = useState('');

  const formatTime = (key: keyof typeof time) => () => {
    let value = moment(time[key], 'HH:mm').format('HH:mm');
    if (value === 'Invalid date') {
      value = '';
    }
    setTime((prev) => ({ ...prev, [key]: value }));
  };

  const calculate = () => {
    const { first, second, third, fourth } = time;
    
    const ready = Object.values(time).filter((value) => value === '').length === 1;
    
    if (!ready) {
      alert('Você deve deixar 1 campo em branco');
      return;
    }

    if (moment(fourth, 'HH:mm').isBefore(moment(third, 'HH:mm'))) {
      alert('O campo "Saída" deve ser maior que o campo "Volta do almoço"');
      return;
    }
    if (moment(third, 'HH:mm').isBefore(moment(second, 'HH:mm'))) {
      alert('O campo "Volta do almoço" deve ser maior que o campo "Saída para almoço"');
      return;
    }
    if (moment(second, 'HH:mm').isBefore(moment(first, 'HH:mm'))) {
      alert('O campo "Saída para almoço" deve ser maior que o campo "Entrada"');
      return;
    }

    const emptyField = Object.keys(time).find((key) => time[key as keyof typeof time] === '');

    if (emptyField === 'first') {
      const firstHour = findFirstHour(time);
      setResult(firstHour);
      return;
    }
    if (emptyField === 'second') {
      const secondHour = findSecondHour(time);
      setResult(secondHour);
      return;
    }
    if (emptyField === 'third') {
      const thirdHour = findThirdHour(time);
      setResult(thirdHour);
      return;
    }
    const lastHour = findLastHour(time);
    setResult(lastHour);
  };

  useEffect(() => {
    setResult('');
  }, [time]);

  return (
    <>
      <Head>
        <title>Calculadora Espelho de ponto</title>
        <meta name="description" content="Calculadora Espelho de ponto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Styles.Main>
        <Styles.Inputs>
          <Styles.InputTip>Entrada</Styles.InputTip>
          <Styles.Input
            type="text"
            value={time.first}
            onChange={(event) => setTime((prev) => ({ ...prev, first: event.target.value }))}
            onBlur={formatTime('first')}
            placeholder="08:00"
            content='Horário de entrada'
          />
          <Styles.InputTip>Saída para almoço</Styles.InputTip>
          <Styles.Input
            type="text"
            value={time.second}
            onChange={(event) => setTime((prev) => ({ ...prev, second: event.target.value }))}
            onBlur={formatTime('second')}
            placeholder="12:00"
          />
          <Styles.InputTip>Volta do almoço</Styles.InputTip>
          <Styles.Input
            type="text"
            value={time.third}
            onChange={(event) => setTime((prev) => ({ ...prev, third: event.target.value }))}
            onBlur={formatTime('third')}
            placeholder="13:00"
          />
          <Styles.InputTip>Saída</Styles.InputTip>
          <Styles.Input
            type="text"
            value={time.fourth}
            onChange={(event) => setTime((prev) => ({ ...prev, fourth: event.target.value }))}
            onBlur={formatTime('fourth')}
            placeholder="17:00"
          />
          <Styles.InputTip>Horas necessárias</Styles.InputTip>
          <Styles.Input
            type="text"
            value={time.needed}
            onChange={(event) => setTime((prev) => ({ ...prev, needed: event.target.value }))}
            onBlur={formatTime('needed')}
            placeholder="08:00"
            required
          />
        </Styles.Inputs>
        <Styles.Tip>Você deve deixar 1 campo em branco</Styles.Tip>
        {!result && <Styles.Button onClick={calculate}>Calcular</Styles.Button>}
        {result && <Styles.Result>A batida em branco deverá ser ajustada para: <strong>{result}</strong></Styles.Result>}
      </Styles.Main>
    </>
  );
};

export default HomePage;