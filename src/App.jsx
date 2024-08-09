import CurrencyInput from '@/components/CurrencyInput/CurrencyInput';
import CurrencyChart from '@/components/CurrencyChart/CurrencyChart';
import CustomButton from './components/CustomButton/CustomButton';
import { useState } from 'react';
import useFetchCurrency from './hooks/useFetchCurrency/useFetchCurrency';
import './App.css';

function App() {
  const [primaryAmount, setPrimaryAmount] = useState('1');
  const [secondaryAmount, setSecondaryAmount] = useState('1');
  const [primaryCurrency, setPrimaryCurrency] = useState('USD');
  const [secondaryCurrency, setSecondaryCurrency] = useState('EUR');
  const [period, setPeriod] = useState('5');

  const {
    data: currencyData,
    loading,
    error,
  } = useFetchCurrency(primaryCurrency, secondaryCurrency, period);

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
    //
  };

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
        {loading && <p>Carregando...</p>}
        {error && <p>Erro: {error}</p>}
        {!loading && <CurrencyChart period={period} data={currencyData} />}
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
