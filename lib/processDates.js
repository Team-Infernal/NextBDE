import moment from "moment";
import "moment/locale/fr";

import { capitalizeFirst } from "./utils";

moment.locale("fr");

const m = input => moment(input);
const fd = (input, format) => capitalizeFirst(moment(input).format(format));

export const getYear = input => fd(input, "YYYY");
export const getMonth = input => fd(input, "MMMM");
export const getMonthNumber = input => fd(input, "M");
export const getDay = input => fd(input, "dddd");
export const getDayNumber = input => fd(input, "D");
export const getDate = input => fd(input, "dddd D MMMM");
export const getTime = input => fd(input, "H:mm");
export const getDateTime = input => fd(input, "dddd D MMMM à H:mm");
export const getNow = () => moment().format("YYYY-MM-DDTHH:mm");
export const getNowS = () => moment().format("YYYY-MM-DDTHH:mm:ss");

export const isBeforeNow = input => m(input).isBefore(m());
export const isAfterNow = input => m(input).isAfter(m());
export const getDateDiff = (input1, input2) => m(input1).diff(m(input2));