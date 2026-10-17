import { z } from "zod";
import { paginationSchema } from "./Pagination.type";

export const BRANCH_SCHEDULE_DAYS = {
    MONDAY: "lunes",
    TUESDAY: "martes",
    WEDNESDAY: "miércoles",
    THURSDAY: "jueves",
    FRIDAY: "viernes",
    SATURDAY: "sábado",
    SUNDAY: "domingo",
};

export type scheduleDays = (typeof BRANCH_SCHEDULE_DAYS)[keyof typeof BRANCH_SCHEDULE_DAYS];
export const scheduleSchema = z.object({
    _id: z.string(),
    schedule: z.array(
        z.object({
            day: z.enum(Object.values(BRANCH_SCHEDULE_DAYS)),
            isOpen: z.boolean(),
            openTime: z.string(),
            closeTime: z.string(),
        })
    )
})

export const branchSchema = z.object({
    _id: z.string(),
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    phone: z.string(),
    email: z.string().email(),
    schedules: scheduleSchema.nullable().optional(),
    isActive: z.boolean(),
    address: z.object({
        "street": z.string(),
        "city": z.string(),
        "state": z.string(),
        "country": z.string(),
        "zipCode": z.string(),
    })
})

export const branchesSchema = z.object({
    data: z.array(branchSchema),
    pagination: paginationSchema
})

export type Schedule = z.infer<typeof scheduleSchema>;
export type ScheduleDataForm = {
    schedule: Schedule["schedule"];
}

export type Branches = z.infer<typeof branchesSchema>;
export type Branch = z.infer<typeof branchSchema>;

export type getBranches = {
    businessId: string;
    branchId: Branch["_id"];
};

export type createNewBranch = Pick<Branch, "name" | "slug" | "phone" | "email" | "address">;
export type updateBrach = createNewBranch;
export type setActiveBranch = Pick<Branch, "isActive">;