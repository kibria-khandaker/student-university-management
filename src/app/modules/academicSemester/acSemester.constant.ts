import {
  IAcSemesterCodes,
  IAcSemesterMonth,
  IAcSemesterTitles,
} from './acSemester.interface'

// export const acSemesterMonth:Month = z.enum(["Salmon", "Tuna", "Trout"]);

export const acSemesterTitles: IAcSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const acSemesterCodes: IAcSemesterCodes[] = ['01', '02', '03']

export const acSemesterMonth: IAcSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const acSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
