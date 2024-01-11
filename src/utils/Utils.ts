import * as R from "ramda"

type ObjectType = Record<string, any>

type NumberSeparator = "," | "." | any

class Utils {
  isNullishObj(obj: ObjectType) {
    return R.values(obj).every(R.isNil)
  }

  isEmpty(value: string | any[] | ObjectType) {
    return R.isEmpty(value)
  }

  isUrl(value: string) {
    const UrlPartern =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
    return UrlPartern.test(value)
  }

  safeReturn(
    object: ObjectType,
    path: (string | number)[] = [],
    fallback = null
  ) {
    const result = R.path(path, object)
    return R.ifElse(R.isNil, R.always(fallback), R.identity)(result)
  }

  replaceVietnamese(str: string) {
    if (this.isEmpty(str)) {
      return ""
    }
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    str = str.replace(/Đ/g, "D")
    return str
  }

  removeNullishValueInObject(obj: ObjectType) {
    const keysOfNullishValue = R.keys(R.filter(R.isNil, obj))
    return R.omit(keysOfNullishValue, obj)
  }

  existsKey(obj: ObjectType, key: string) {
    return R.has(key, obj)
  }

  mapObject(obj: ObjectType, mapFn: (arg0: string, arg1: any) => ObjectType) {
    return Object.keys(obj).reduce((result: ObjectType, key: string) => {
      result[key] = mapFn(key, obj[key])
      return result
    }, {})
  }

  removeCharacter(str: string, character: string) {
    return R.compose(R.join(""), R.split(character))(str)
  }

  findItemByPropertyValue(
    matchValue: any,
    propertyName: string,
    arr: ObjectType[],
    isOnlyGetFirstMatch = true
  ) {
    const result = isOnlyGetFirstMatch
      ? R.reject(R.isNil, [R.find(R.propEq(matchValue, propertyName), arr)])
      : R.filter(R.propEq(matchValue, propertyName), arr)

    return R.isNil(result) || this.isEmpty(result) ? null : result
  }

  deepCompare(a: any, b: any) {
    return R.equals(a, b)
  }

  trimNumeric(
    value: string | number,
    decimalPoint: NumberSeparator = ".",
    groupSeparator: NumberSeparator = ","
  ) {
    return value
      .toString()
      .replace(/^0*/g, "")
      .replace(/^-+0+/g, "-")
      .replace(new RegExp(`\\${decimalPoint}0*$`, "g"), "")
      .replace(new RegExp(`(\\${decimalPoint}\\d*?)0+$`, 'g'), "$1")
      .replace(new RegExp(`\\${groupSeparator}$`, "g"), "")
  }

  removeNumericGroupSeparator = ({
    value = "",
    groupSeparator = ",",
    decimalPoint = ".",
    numOfIntegerDigits = "auto",
    numOfDecimalDigits = "auto",
    numOfDigits = "auto",
  }: {
    value: string | number
    groupSeparator?: NumberSeparator
    decimalPoint?: NumberSeparator
    numOfIntegerDigits?: number | "auto"
    numOfDecimalDigits?: number | "auto"
    numOfDigits?: number | "auto"
  }) => {
    const valueAsString = value.toString()
    if (this.isEmpty(valueAsString)) return valueAsString

    const [integerPart, decimalPart] = valueAsString.split(decimalPoint)

    const integerPartWithoutGroupSeparator = this.removeCharacter(
      integerPart,
      groupSeparator
    )

    if (R.isNil(decimalPart) || numOfDecimalDigits === 0) {
      switch (true) {
        case numOfDigits === "auto" && numOfIntegerDigits === "auto":
          return integerPartWithoutGroupSeparator

        case typeof numOfDigits === "number" && numOfIntegerDigits === "auto":
          return integerPartWithoutGroupSeparator.slice(0, <number>numOfDigits)

        case typeof numOfIntegerDigits === "number" && numOfDigits === "auto":
          return integerPartWithoutGroupSeparator.slice(
            0,
            <number>numOfIntegerDigits
          )
        default: {
          return integerPartWithoutGroupSeparator.slice(
            0,
            Math.min(<number>numOfDigits, <number>numOfIntegerDigits)
          )
        }
      }
    }

    const newIntegerPart =
      numOfIntegerDigits === "auto"
        ? integerPartWithoutGroupSeparator
        : integerPartWithoutGroupSeparator.slice(0, <number>numOfIntegerDigits)

    const newDecimalPart =
      numOfDecimalDigits === "auto"
        ? decimalPart
        : decimalPart.substring(0, <number>numOfDecimalDigits)

    const numberWithoutGroupSeparator = R.isNotNil(newDecimalPart)
      ? newIntegerPart + decimalPoint + newDecimalPart
      : newIntegerPart

    return numOfDigits === "auto"
      ? numberWithoutGroupSeparator
      : numberWithoutGroupSeparator.substring(0, <number>numOfDigits + 1) // +1 for decimal point
  }

  addNumericGroupSeparator = ({
    value = "",
    groupSeparator = ",",
    decimalPoint = ".",
  }: {
    value: string | number
    groupSeparator?: NumberSeparator
    decimalPoint?: NumberSeparator
  }) => {
    const valueAsString = value.toString()
    if (this.isEmpty(valueAsString)) return valueAsString
    const [integerPart, decimalPart] = valueAsString.split(decimalPoint)

    const integerPartWithGroupSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      groupSeparator
    )

    return R.isNil(decimalPart)
      ? integerPartWithGroupSeparator
      : `${integerPartWithGroupSeparator}${decimalPoint}${decimalPart}`
  }
}

export default new Utils()
