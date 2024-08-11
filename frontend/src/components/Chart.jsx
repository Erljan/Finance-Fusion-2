import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
  } from "recharts";

export const Chart = ({data, width, height}) => {
  return (
    <ResponsiveContainer width={width} aspect={2}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor="rgb(199 210 254)"
            stopOpacity={0.8}
          />
          <stop
            offset="95%"
            stopColor="rgb(199 210 254)"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <Area
        type="linear"
        dataKey="value"
        stroke="#312e81"
        fillOpacity={1}
        strokeWidth={0.1}
        fill="url(#chartColor)"
      />
      <XAxis dataKey={"time"} />
      <YAxis domain={["dataMin", "dataMax"]} />
      <Tooltip />
    </AreaChart>
  </ResponsiveContainer>
  )
}
