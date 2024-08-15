import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const BudgetChart = ({transactions, width, height}) => {
  return (
    <div>
        <ResponsiveContainer width={width}  aspect={height}>
      <LineChart
          data={transactions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="created" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Line type="monotone" dataKey="transac_name" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="amount" stroke="#0077b6" />
        </LineChart>
      </ResponsiveContainer> 
    </div>
  )
}
