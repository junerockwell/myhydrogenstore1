export function OutOfStockStrikethrough({
  strokeWidth = 2,
  color = 'black',
  style,
}) {
  return (
    <svg
      // height="300"
      // width="300"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <line
        x1="0"
        y1="300"
        x2="300"
        y2="0"
        style={{stroke: color, strokeWidth}}
      />
    </svg>
  );
}
