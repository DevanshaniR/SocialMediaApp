import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onPerfEntry({
      name: 'FCP',
      value: 1234,
      delta: 0,
      id: '',
      entries: []
    });
  }
};

export default reportWebVitals;
