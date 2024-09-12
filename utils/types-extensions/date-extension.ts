export class DateExtensions {
  // Crop date into day, month, year. It returns Date object.
  static cropDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Handle when it overflows to next month
  static addDays(date: Date, numberOfDays: number): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + numberOfDays
    );
  }

  static addMinutes(date: Date, numberOfMinutes: number): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + numberOfMinutes
    );
  }

  static addMonth(date: Date, numberOfMonths: number): Date {
    console.log("Adding month: ", date, numberOfMonths);
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth() + numberOfMonths,
        date.getUTCDate()
      )
    );
  }

  static correctDate(date: Date): Date {
    return this.addMinutes(date, -date.getTimezoneOffset());
  }

  static cropDateTillMonth(date: Date): Date {
    console.log("Cropping date: ", date);
    const cropped = new Date(date.getFullYear(), date.getMonth(), 1);
    return this.addMinutes(cropped, 0);
  }
}
