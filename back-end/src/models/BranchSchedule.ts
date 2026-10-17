
import mongoose, { Document, PopulatedDoc, Schema } from "mongoose";
import { IBranch } from "./Branch";

export const BRANCH_SCHEDULE_DAYS = {
    MONDAY: "lunes",
    TUESDAY: "martes",
    WEDNESDAY: "miércoles",
    THURSDAY: "jueves",
    FRIDAY: "viernes",
    SATURDAY: "sábado",
    SUNDAY: "domingo",
} as const;

export type ScheduleDays =
    typeof BRANCH_SCHEDULE_DAYS[keyof typeof BRANCH_SCHEDULE_DAYS];

export interface IScheduleDay {
    day: ScheduleDays;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
}

export interface IBranchSchedule extends Document {
    branch: PopulatedDoc<IBranch>;
    schedule: IScheduleDay[];
}

const ScheduleDaySchema = new Schema<IScheduleDay>(
    {
        day: {
            type: String,
            required: true,
            enum: Object.values(BRANCH_SCHEDULE_DAYS),
        },
        isOpen: {
            type: Boolean,
            default: true,
            required: true,
        },
        openTime: {
            type: String,
            required: true,
        },
        closeTime: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const BranchScheduleSchema = new Schema<IBranchSchedule>(
    {
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
            unique: true,
        },
        schedule: {
            type: [ScheduleDaySchema],
            required: true,
            validate: {
                validator: (value: IScheduleDay[]) => value.length === 7,
                message: "El horario debe contener los siete días de la semana.",
            },
        },
    },
    { timestamps: true }
);

export const BranchSchedule = mongoose.model<IBranchSchedule>(
    "BranchSchedule",
    BranchScheduleSchema
);
