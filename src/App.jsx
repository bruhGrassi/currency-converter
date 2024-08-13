import CurrencyInput from '@/components/CurrencyInput/CurrencyInput';
import CurrencyChart from '@/components/CurrencyChart/CurrencyChart';
import CustomButton from './components/CustomButton/CustomButton';
import { useState, useEffect } from 'react';
import useFetchCurrency from './hooks/useFetchCurrency/useFetchCurrency';
import './App.css';

function App() {
  const [primaryAmount, setPrimaryAmount] = useState('1');
  const [secondaryAmount, setSecondaryAmount] = useState('1');
  const [primaryCurrency, setPrimaryCurrency] = useState('USD');
  const [secondaryCurrency, setSecondaryCurrency] = useState('EUR');
  const [period, setPeriod] = useState('5');
  const [initialLoad, setInitialLoad] = useState(true);

  const {
    data: currencyData,
    loading,
    error,
  } = useFetchCurrency(primaryCurrency, secondaryCurrency, period);

  useEffect(() => {
    if (!initialLoad && currencyData && currencyData.length > 0) {
      convertCurrency();
    }
  }, [currencyData, primaryAmount, primaryCurrency, secondaryCurrency]);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const convertCurrency = () => {
    if (!currencyData || currencyData.length === 0) return;

    const latestData = currencyData[currencyData.length - 1];
    const conversionRate = parseFloat(latestData?.value) || 1;
    const amount = parseFloat(primaryAmount);

    if (!isNaN(amount) && !isNaN(conversionRate)) {
      const newSecondaryAmount = (amount * conversionRate).toFixed(2);
      setSecondaryAmount(newSecondaryAmount);
    } else {
      setSecondaryAmount('Invalid');
    }
  };

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

  const invertCurrency = () => {
    const tempCurrency = primaryCurrency;
    setPrimaryCurrency(secondaryCurrency);
    setSecondaryCurrency(tempCurrency);
    convertCurrency();
  };

  return (
    <>
      <div className=" w-full flex flex-col sm:flex-row items-center gap-4 mb-4">
        <CurrencyInput
          amount={primaryAmount}
          currency={primaryCurrency}
          onAmountChange={(amount) => handleAmountChange(amount, 'primary')}
          onCurrencyChange={(currency) =>
            handleCurrencyChange(currency, 'primary')
          }
        />

        <CustomButton icon={true} onClick={invertCurrency} />

        <CurrencyInput
          amount={secondaryAmount}
          currency={secondaryCurrency}
          onAmountChange={(amount) => handleAmountChange(amount, 'secondary')}
          onCurrencyChange={(currency) =>
            handleCurrencyChange(currency, 'secondary')
          }
        />
      </div>

      <div className="w-full mb-4 text-center">
        <p className="text-xl sm:text-2xl mt-16 mb-4">1 {primaryCurrency}</p>
        <p className="text-3xl sm:text-4xl mb-12">
          {secondaryAmount} {secondaryCurrency}
        </p>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}

      {!loading && (
        <main>
          <div className="w-full flex items-center gap-4 mb-16">
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
          <CurrencyChart period={period} data={currencyData} />
        </main>
      )}

      <footer className="mt-16 text-center">
        <a href="https://github.com/bruhGrassi" target="_blank">
          Create by <span>Bruna Grassi</span>
        </a>
      </footer>
    </>
  );
}

export default App;
