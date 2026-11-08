import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/types/api";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data }, init);
}

export function fail(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json<ApiFailure>(
    { success: false, error: { code, message, ...(details !== undefined && { details }) } },
    { status },
  );
}
