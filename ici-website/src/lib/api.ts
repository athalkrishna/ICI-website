import { NextResponse } from 'next/server';

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorized(message = 'Unauthorized') {
  return jsonError(message, 401);
}

export function forbidden(message = 'Forbidden') {
  return jsonError(message, 403);
}

export function notFound(message = 'Not found') {
  return jsonError(message, 404);
}

export function serverError(message = 'Internal server error') {
  return jsonError(message, 500);
}
