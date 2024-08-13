import PropTypes from 'prop-types';
import Flag from 'react-world-flags';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const countries = [
  { flag: 'US', name: 'Dólar Americano', currency: 'USD' },
  { flag: 'CA', name: 'Dólar Canadense', currency: 'CAD' },
  { flag: 'EU', name: 'Euro', currency: 'EUR' },
  { flag: 'GB', name: 'Libra Esterlina', currency: 'GBP' },
  { flag: 'JP', name: 'Yen Japonês', currency: 'JPY' },
];

const CurrencyInput = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <div className="flex sm:flex-row items-center border border-custom-blue p-3 rounded-xl bg-custom-blue">
      <Select
        onValueChange={onCurrencyChange}
        value={currency}
        className="flex items-center mb-2 sm:mb-0"
      >
        <SelectTrigger className="w-full sm:w-[220px] border-none bg-custom-blue text-white">
          <SelectValue placeholder="" className="text-white" />
        </SelectTrigger>
        <SelectContent className="border-none bg-custom-blue">
          {countries.map((country) => (
            <SelectItem
              key={country.currency}
              value={country.currency}
              className="flex items-center py-2 px-8 hover:bg-gray-200"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <Flag
                    code={country.flag}
                    style={{
                      width: '24px',
                      height: '24px',
                      marginRight: '8px',
                    }}
                  />
                </div>
                <span className="text-white">{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="w-full sm:w-[150px] ml-0 sm:ml-2 border-none rounded-none bg-custom-blue text-white-800"
      />
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.string,
  currency: PropTypes.string,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
