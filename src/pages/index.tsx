
import { useEffect, useState } from 'react'
import * as Styles from '@/pages/page.styles'
import Head from 'next/head'
import moment from 'moment'
import hourToMinutes from '@/utils/hourToMinutes'
import minutesToHours from '@/utils/minutesToHours'

const Home = () => {
  const [time, setTime] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    needed: '08:00',
  });
  const [result, setResult] = useState('');

  const findFirstHour = () => {
    const { second, third, fourth, needed } = time;

    const secondMinutes = hourToMinutes(second);
    const thirdMinutes = hourToMinutes(third);
    const fourthMinutes = hourToMinutes(fourth);
    const neededMinutes = hourToMinutes(needed);
    const secondHalfMinutes = fourthMinutes - thirdMinutes;
    const firstMinutes = secondMinutes - neededMinutes + secondHalfMinutes;

    return minutesToHours(firstMinutes);
  };

  const findSecondHour = () => {
    const { first, third, fourth, needed } = time;

    const firstMinutes = hourToMinutes(first);
    const thirdMinutes = hourToMinutes(third);
    const fourthMinutes = hourToMinutes(fourth);
    const neededMinutes = hourToMinutes(needed);
    const secondHalfMinutes = fourthMinutes - thirdMinutes;
    const secondMinutes = neededMinutes - secondHalfMinutes + firstMinutes;

    return minutesToHours(secondMinutes);
  };

  const findThirdHour = () => {
    const { first, second, fourth, needed } = time;

    const firstMinutes = hourToMinutes(first);
    const secondMinutes = hourToMinutes(second);
    const fourthMinutes = hourToMinutes(fourth);
    const neededMinutes = hourToMinutes(needed);
    const firstHalfMinutes = secondMinutes - firstMinutes;
    const thirdMinutes = fourthMinutes - neededMinutes + firstHalfMinutes;

    return minutesToHours(thirdMinutes);
  };

  const findLastHour = () => {
    const { first, second, third, needed } = time;

    const firstMinutes = hourToMinutes(first);
    const secondMinutes = hourToMinutes(second);
    const thirdMinutes = hourToMinutes(third);
    const neededMinutes = hourToMinutes(needed);
    const firstHalfMinutes = secondMinutes - firstMinutes;
    const fourthMinutes = neededMinutes - firstHalfMinutes + thirdMinutes;

    return minutesToHours(fourthMinutes);
  };

  const formatTime = (key: keyof typeof time) => () => {
    let value = moment(time[key], 'HH:mm').format('HH:mm');
    if (value === 'Invalid date') {
      value = '';
    }
    setTime((prev) => ({ ...prev, [key]: value }));
  };

  const calculate = () => {
    const { first, second, third, fourth, needed } = time;
    
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
      const firstHour = findFirstHour();
      setResult(firstHour);
      return;
    }
    if (emptyField === 'second') {
      const secondHour = findSecondHour();
      setResult(secondHour);
      return;
    }
    if (emptyField === 'third') {
      const thirdHour = findThirdHour();
      setResult(thirdHour);
      return;
    }
    const lastHour = findLastHour();
    setResult(lastHour);
  }

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
  )
}

export default Home;