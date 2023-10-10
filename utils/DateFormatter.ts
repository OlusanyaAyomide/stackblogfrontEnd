class DateFormatter {
  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  getGreeting(): string {
    const currentHour = this.currentDate.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  formatDate(timeString: string): string {
    const inputDate = new Date(timeString);
    if (isNaN(inputDate.getTime())) {
      return 'Invalid date';
    }

    const day = inputDate.getDate();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    return `${day} ${month} ${year}`;
  }
}

export default DateFormatter