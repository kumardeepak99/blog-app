// import { parseISO, format } from "date-fns";

// export default function DateFormatter(dateString: any) {
//   const date = parseISO(dateString);
//   return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
// }

// import { parseISO, format } from "date-fns";

// type DateProps = {
//   dateString: string;
// };

// const DateFormatter: React.FC<DateProps> = ({ dateString }) => {
//   const date = parseISO(dateString);
//   return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
// };

// export default DateFormatter;

import { format } from "date-fns";

type DateProps = {
  date: Date;
};

const DateFormatter: React.FC<DateProps> = ({ date }) => {
  return <time dateTime={date.toISOString()}>{format(date, "LLLL d, yyyy")}</time>;
};

export default DateFormatter;
