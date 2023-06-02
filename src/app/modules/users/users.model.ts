import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
