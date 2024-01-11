import moment, { Moment, unitOfTime } from "moment"

export type DateTimeFormat =
  | "YYYY-MM-DD"
  | "DD-MM-YYYY"
  | "YYYY/MM/DD"
  | "DD/MM/YYYY"
  | "HH:mm:ss"
  | "HH:mm"
  | "YYYY-MM-DD HH:mm:ss"
  | "DD/MM/YYYY HH:mm:ss"

class DateTime {
  private readonly defaultFormat: DateTimeFormat = "YYYY-MM-DD"

  format(datetime?: Moment, format: DateTimeFormat = this.defaultFormat) {
    if (!datetime) return null
    return moment(datetime).format(format)
  }

  getCurrent(format: DateTimeFormat = this.defaultFormat) {
    return this.format(moment(), format)
  }

  compareDate(moment1: Moment, moment2: Moment = moment()) {
    if (moment1 > moment2) return 1
    else if (moment1 < moment2) return -1
    else return 0
  }

  getDateDiff({
    moment1,
    moment2 = moment(),
    unit = "milliseconds",
  }: {
    moment1: Moment
    moment2?: Moment
    unit?: unitOfTime.Diff
  }) {
    return Math.abs(moment2.diff(moment1, unit))
  }
}

export default new DateTime()
