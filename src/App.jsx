import { ArrowLeftRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput';
import CurrencyChart from '@/components/CurrencyChart/CurrencyChart';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/Skeleton/Skeleton';
import useFetchCurrency from '@/hooks/useFetchCurrency/useFetchCurrency';
import './App.css';

const currencyOptions = [
  { flag: 'BR', name: 'Real brasileiro', currency: 'BRL' },
  { flag: 'US', name: 'Dólar Americano', currency: 'USD' },
  { flag: 'CA', name: 'Dólar Canadense', currency: 'CAD' },
  { flag: 'EU', name: 'Euro', currency: 'EUR' },
  { flag: 'GB', name: 'Libra Esterlina', currency: 'GBP' },
  { flag: 'JP', name: 'Yen Japonês', currency: 'JPY' },
];

function App() {
  const [primaryAmount, setPrimaryAmount] = useState('1');
  const [secondaryAmount, setSecondaryAmount] = useState('1');
  const [primaryCurrency, setPrimaryCurrency] = useState('USD');
  const [secondaryCurrency, setSecondaryCurrency] = useState('BRL');
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
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (!regex.test(newAmount)) return;

    const updateField = {
      primary: setPrimaryAmount,
      secondary: setSecondaryAmount,
    }[field];

    if (updateField) {
      updateField(newAmount);
    }
  };

  const handleCurrencyChange = (newCurrency, field) => {
    const isPrimary = field === 'primary';
    const currentCurrency = isPrimary ? primaryCurrency : secondaryCurrency;
    const oppositeCurrency = isPrimary ? secondaryCurrency : primaryCurrency;
    const setCurrentCurrency = isPrimary
      ? setPrimaryCurrency
      : setSecondaryCurrency;

    if (newCurrency === oppositeCurrency) {
      setPrimaryCurrency(oppositeCurrency);
      setSecondaryCurrency(currentCurrency);
      setPrimaryAmount(secondaryAmount);
      setSecondaryAmount(primaryAmount);
    } else {
      setCurrentCurrency(newCurrency);
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
      {loading ? (
        <Skeleton />
      ) : (
        <div className="w-full">
          <div className="w-full flex flex-col justify-center lg:flex-row items-center gap-4 mb-4">
            <CurrencyInput
              currencyOptions={currencyOptions}
              amount={primaryAmount}
              currency={primaryCurrency}
              onAmountChange={(amount) => handleAmountChange(amount, 'primary')}
              onCurrencyChange={(currency) =>
                handleCurrencyChange(currency, 'primary')
              }
            />
            <Button
              onClick={invertCurrency}
              className={'text-green-500 bg-transparent hover:bg-transparent'}
            >
              <ArrowLeftRight />
            </Button>

            <CurrencyInput
              currencyOptions={currencyOptions}
              amount={secondaryAmount}
              currency={secondaryCurrency}
              onAmountChange={(amount) =>
                handleAmountChange(amount, 'secondary')
              }
              onCurrencyChange={(currency) =>
                handleCurrencyChange(currency, 'secondary')
              }
            />
          </div>

          <div className="w-full mb-4 text-center">
            <p className="text-xl sm:text-2xl mt-16 mb-4">
              1 {primaryCurrency}
            </p>
            <p className="text-3xl sm:text-4xl mb-12">
              {secondaryAmount} {secondaryCurrency}
            </p>
          </div>

          <main>
            <div className="w-full flex items-center gap-4 mb-16">
              <Button
                className={`hover:bg-transparent hover:text-gray-100 ${period === '5' ? 'active' : ''}`}
                onClick={() => handlePeriod('5')}
              >
                5 Dias
              </Button>
              <Button
                className={`hover:bg-transparent hover:text-gray-100 ${period === '30' ? 'active' : ''}`}
                onClick={() => handlePeriod('30')}
              >
                1 Mês
              </Button>
            </div>
            <CurrencyChart period={period} data={currencyData} />
          </main>

          <footer className="mt-16 text-center">
            <p>
              Created with ❤️ by{' '}
              <a href="https://github.com/bruhGrassi" target="_blank">
                Bruna Grassi
              </a>
            </p>
          </footer>
        </div>
      )}
      {error && <p>Erro: {error}</p>}
    </>
  );
}

export default App;
