import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const BudgetChart = ({transactions, width, height}) => {
    const reversedTransac = [...transactions].reverse()
    const maxAmount = Math.max(...reversedTransac.map(t => t.amount));
  return (
    <div>
        <ResponsiveContainer width={width}  aspect={height}>
      <LineChart
          data={reversedTransac}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="created" />
          <YAxis domain={[0, maxAmount]}/>
          <Tooltip />
          <Line type="linear" dataKey="amount" stroke="#0077b6" />
        </LineChart>
      </ResponsiveContainer> 
    </div>
  )
}
