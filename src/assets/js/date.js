//当前周次的类，用于获取当前周的起止日期
export default class WeekDate {
    constructor() {
        let now = new Date(); //当前时间
        this.nowYear = now.getFullYear(); //获取年
        this.nowMonth = now.getMonth(); //月
        this.nowDay = now.getDate(); //日
        this.nowDayofWeek = now.getDay(); //本周的第几天
        this.nowDayofWeek = this.nowDayofWeek === 0 ? 7 : this.nowDayofWeek; //如果是周日，就变成周七
    }
    formatDate(date) {
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();
        return `${mymonth}月${myweekday}日`
    }
    getWeekStartDate() {
        let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayofWeek + 1);
        return this.formatDate(weekStartDate)
    }
    getWeekEndDate() {
        let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayofWeek + 1));
        return this.formatDate(weekEndDate)
    }
};