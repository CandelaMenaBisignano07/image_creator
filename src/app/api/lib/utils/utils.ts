export function isError(error:unknown| Error): error is Error{
    return error instanceof Error
}