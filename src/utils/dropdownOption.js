export const getFinancialYearOptions = (data) => {
   const data1 = data?.financialYears?.map((item) => ({
    label: item.year,
    value: item.year,
  })) || [];
  return [{label : "ALL" , value : "all"} , ...data1];
};

 export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
export const generateYearAndMonthOptions = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      years: [],
      months: [],
    };
  }

  const years = [];
  const months = new Set();

  data.forEach((item) => {
    if (!item?.date) return;

    const date = new Date(item.date);

    // Skip invalid dates
    if (isNaN(date.getTime())) return;

    const year = date.getFullYear().toString();
    const monthNumber = date.getMonth() + 1;
    const monthLabel = monthNames[date.getMonth()];

    // Add unique year
    if (!years.find((y) => y.value === year)) {
      years.push({
        label: year,
        value: year,
      });
    }

    // Add unique month
    months.add(
      JSON.stringify({
        label: monthLabel,
        value: monthNumber,
      })
    );
  });

  return {
    years,
    months: Array.from(months).map((item) => JSON.parse(item)),
  };
};
