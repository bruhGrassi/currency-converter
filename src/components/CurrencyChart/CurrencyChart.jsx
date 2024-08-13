import PropTypes from 'prop-types';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Valor',
    color: 'blue',
  },
};

function CurrencyChart({ data, period }) {
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

  const filteredData = period === '30' ? sortedData : sortedData.slice(-5);

  return (
    <Card className="border-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 4,
              right: 4,
              bottom: 60,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(date) => {
                return date;
              }}
              angle={-45}
              textAnchor="end"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="value"
              type="natural"
              stroke="#747bff"
              strokeWidth={1}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

CurrencyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  period: PropTypes.oneOf(['5', '30']).isRequired,
};

export default CurrencyChart;
