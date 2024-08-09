import CurrencyInput from '@/components/CurrencyInput/CurrencyInput';
import CurrencyChart from '@/components/CurrencyChart/CurrencyChart';
import CustomButton from './components/CustomButton/CustomButton';
import { useState } from 'react';
import './App.css';

function App() {
  const [primaryAmount, setPrimaryAmount] = useState('');
  const [secondaryAmount, setSecondaryAmount] = useState('');
  const [primaryCurrency, setPrimaryCurrency] = useState('US');
  const [secondaryCurrency, setSecondaryCurrency] = useState('US');
  const [period, setPeriod] = useState('30');

  const handleAmountChange = (newAmount, field) => {
    if (field === 'primary') {
      setPrimaryAmount(newAmount);
    } else {
      setSecondaryAmount(newAmount);
    }
  };

  const handleCurrencyChange = (newCurrency, field) => {
    if (field === 'primary') {
      setPrimaryCurrency(newCurrency);
    } else {
      setSecondaryCurrency(newCurrency);
    }
  };

  const handlePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const changeCurrency = () => {
    console.log('change');
  };

  const currencyData = [
    { date: '2024-07-02', value: 5.1 },
    { date: '2024-07-02', value: 2.9 },
    { date: '2024-07-02', value: 1.1 },
    { date: '2024-07-02', value: 3.1 },
  ];

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <CurrencyInput
          amount={primaryAmount}
          currency={primaryCurrency}
          onAmountChange={(amount) => handleAmountChange(amount, 'primary')}
          onCurrencyChange={(currency) =>
            handleCurrencyChange(currency, 'primary')
          }
        />

        <CustomButton icon={true} onClick={changeCurrency} />

        <CurrencyInput
          amount={secondaryAmount}
          currency={secondaryCurrency}
          onAmountChange={(amount) => handleAmountChange(amount, 'secondary')}
          onCurrencyChange={(currency) =>
            handleCurrencyChange(currency, 'secondary')
          }
        />
      </div>
      <div className="w-100 mb-4">
        <p className="text-2xl mt-16 mb-4">1 Dólar americano</p>
        <p className="text-4xl mb-12">5 Reais brasileiros</p>
      </div>

      <div className="w-100 flex items-center gap-4 mb-4">
        <CustomButton
          text="5 Dias"
          isActive={period === '5'}
          onClick={() => handlePeriod('5')}
        />
        <CustomButton
          text="1 Mês"
          isActive={period === '30'}
          onClick={() => handlePeriod('30')}
        />
      </div>

      <section>
        <CurrencyChart period={period} data={currencyData} />
      </section>

      <footer className="mt-16">
        <a href="https://github.com/bruhGrassi" target="_blank">
          Create by <span>Bruna Grassi</span>
        </a>
      </footer>
    </>
  );
}

export default App;
