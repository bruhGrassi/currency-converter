import Flag from 'react-world-flags';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PropTypes from 'prop-types';

const countries = [
  { code: 'US', name: 'Dólar Americano' },
  { code: 'CA', name: 'Dólar Canadense' },
  { code: 'EU', name: 'Euro' },
  { code: 'GB', name: 'Libra Esterlina' },
  { code: 'JP', name: 'Yen Japonês' },
];

const CurrencyInput = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <div className="flex items-center border border-custom-blue p-3 rounded-xl bg-custom-blue">
      <Select
        onValueChange={onCurrencyChange}
        value={currency}
        className="flex items-center"
      >
        <SelectTrigger className="w-[220px] border-none bg-custom-blue text-white">
          <SelectValue placeholder="" className="text-white" />
        </SelectTrigger>
        <SelectContent className="border-none bg-custom-blue">
          {countries.map((country) => (
            <SelectItem
              key={country.code}
              value={country.code}
              className="flex items-center py-2 px-8 hover:bg-gray-200"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <Flag
                    code={country.code}
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
        className="ml-2 border-none rounded-none bg-custom-blue text-white-800 w-[150px]"
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
