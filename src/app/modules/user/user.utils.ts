import { IAcSemester } from '../academicSemester/acSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

// export const generateUserId = async () => {
export const generateStudentId = async (
  acSemester: IAcSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  //   increment by one
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementId = `${acSemester?.year.substring(2)}${
    acSemester?.code
  }${incrementId}`
  // console.log(incrementId);
  return incrementId
}

//---------
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

// export const generateUserId = async () => {
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')

  //   increment by one
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementId = `F-${incrementId}`
  // console.log(incrementId);
  return incrementId
}
