const dateWithOrdinalIndicator = date => {
  if (date.endsWith("1") && date !== "11") {
    return date + "st";
  } else if (date.endsWith("2") && date !== "12") {
    return date + "nd";
  } else if (date.endsWith("3") && date !== "13") {
    return date + "rd";
  } else {
    return date + "th";
  }
};

const getCurrentMonth = () => {
  return [
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
    "December"
  ];
};

const getDueDate = date => {
  return dateWithOrdinalIndicator(date.toString());
};

const getDueDateMonth = dueDate => {
  if (new Date().getDate() > dueDate) {
    return getCurrentMonth()[new Date().getMonth() + 1];
  } else if (new Date().getDate() < dueDate) {
    return getCurrentMonth()[new Date().getMonth()];
  }
};

export default {
  getDueDate,
  getDueDateMonth
};
