import moment from "moment";

moment.locale("fr");

export const convertDate = (inputDate) => moment(inputDate).format("dddd D MMMM à H:mm");
export const convertDateDay = (inputDate) => moment(inputDate).format("dddd D MMMM");
export const convertDateTime = (inputDate) => moment(inputDate).format("H:mm");