import { format } from 'date-fns';

const formatDate = (date: Date): string => {
  return format(new Date(date), 'MMM-dd-yyyy');
};

export default formatDate;
