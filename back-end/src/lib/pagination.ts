import type { Model } from "mongoose";

const DEFAULT_PAGE_SIZE = 2;

interface PaginationOptions {
    page?: unknown;
    sort?: Record<string, 1 | -1>;
    select?: string;
    populate?: {
        path: string;
        select?: string;
    };
}

export interface PaginationResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

function parsePage(value: unknown): number {
    if (typeof value !== "string" && typeof value !== "number") {
        return 1;
    }

    const page = Number(value);

    if (!Number.isInteger(page) || page < 1) {
        return 1;
    }

    return page;
}

export async function paginate<T>(
    model: Model<T>,
    filter: Record<string, unknown> = {},
    options: PaginationOptions = {}
): Promise<PaginationResult<T>> {

    const page = parsePage(options.page);
    const limit = DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * limit;

    const query = model
        .find(filter)
        .skip(skip)
        .limit(limit);

    if (options.sort) {
        query.sort(options.sort);
    }

    if (options.select) {
        query.select(options.select);
    }

    if (options.populate) {
        query.populate(options.populate);
    }

    const [data, total] = await Promise.all([
        query.exec(),
        model.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
}